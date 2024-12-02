export const extractJobType = (value: string) => {
  switch (value) {
    case "FULL_TIME":
      return "Full Time";
    case "PART_TIME":
      return "Part Time";
    case "REMOTE":
      return "Remote";
    case "FREELANCE":
      return "Freelance";
  }
};
