package com.core.job_finder.cv;


import com.core.job_finder.auth.AuthService;
import com.core.job_finder.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class CvService {

    private final CvRepository cvRepository;
    private final AuthService authService;

    public CvResponse findCvByUserId() {
        User user = authService.getCurrentUser();
        Cv cv = cvRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Cv not found"));
        return toCvResponse(cv);
    }


    public CvResponse createCv(CvRequestDTO cvRequestDTO) {
        User user = authService.getCurrentUser();

        if (cvRepository.existsCvByUserId(user.getId())) {
            throw new RuntimeException("Cv already exists");
        }

        Cv cv = Cv.builder()
                .user(user)
                .fullName(cvRequestDTO.getFullName())
                .birthDay(cvRequestDTO.getBirthDay())
                .nationality(cvRequestDTO.getNationality())
                .maritalStatus(Cv.MaritalStatus.fromString(cvRequestDTO.getMaritalStatus()))
                .gender(Cv.Gender.MALE.fromString(cvRequestDTO.getGender()))
                .address(cvRequestDTO.getAddress())
                .summary(cvRequestDTO.getSummary())
                .coverLetter(cvRequestDTO.getCoverLetter())
                .profilePictureUrl(cvRequestDTO.getProfilePictureUrl())
                .resumeUrl(cvRequestDTO.getResumeUrl())
                .websiteUrl(cvRequestDTO.getWebsiteUrl())
                .certifications(cvRequestDTO.getCertifications())
                .skills(cvRequestDTO.getSkills())
                .experience(cvRequestDTO.getExperience())
                .education(cvRequestDTO.getEducation())
                .languages(cvRequestDTO.getLanguages())
                .build();

        Cv res = cvRepository.save(cv);

        return toCvResponse(res);
    }

    public CvResponse toCvResponse(Cv cv) {
        return new CvResponse(
                cv.getId(),
                cv.getFullName(),
                cv.getBirthDay(),
                cv.getNationality(),
                cv.getMaritalStatus(),
                cv.getGender(),
                cv.getAddress(),
                cv.getSummary(),
                cv.getCoverLetter(),
                cv.getProfilePictureUrl(),
                cv.getResumeUrl(),
                cv.getWebsiteUrl(),
                cv.getSkills(),
                cv.getExperience(),
                cv.getEducation(),
                cv.getLanguages(),
                cv.getCertifications()
        );
    }
}
