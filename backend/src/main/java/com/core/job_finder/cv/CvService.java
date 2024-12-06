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
        return CvResponse.toCvResponse(cv);
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
                .gender(Cv.Gender.fromString(cvRequestDTO.getGender()))
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

        return CvResponse.toCvResponse(res);
    }

    public CvResponse updateCv(CvRequestDTO cvRequestDTO) {
        User user = authService.getCurrentUser();

        Cv cv = cvRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Cv not found"));

        cv.setFullName(cvRequestDTO.getFullName());
        cv.setBirthDay(cvRequestDTO.getBirthDay());
        cv.setNationality(cvRequestDTO.getNationality());
        cv.setMaritalStatus(Cv.MaritalStatus.fromString(cvRequestDTO.getMaritalStatus()));
        cv.setGender(Cv.Gender.fromString(cvRequestDTO.getGender()));
        cv.setAddress( cvRequestDTO.getAddress());
        cv.setSummary(cvRequestDTO.getSummary());
        cv.setCoverLetter(cvRequestDTO.getCoverLetter());
        cv.setProfilePictureUrl(cvRequestDTO.getProfilePictureUrl());
        cv.setResumeUrl(cvRequestDTO.getResumeUrl());
        cv.setWebsiteUrl(cvRequestDTO.getWebsiteUrl());
        cv.setCertifications(cvRequestDTO.getCertifications());
        cv.setSkills(cvRequestDTO.getSkills());
        cv.setExperience(cvRequestDTO.getExperience());
        cv.setEducation(cvRequestDTO.getEducation());
        cv.setLanguages(cvRequestDTO.getLanguages());

        Cv res = cvRepository.save(cv);
        return CvResponse.toCvResponse(res);
    }


}
