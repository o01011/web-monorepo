export const POST_VALIDATION = {
  TITLE: {
    MIN_LENGTH: 5,
    MAX_LENGTH: 30,
  },
  DESCRIPTION: {
    MIN_LENGTH: 5,
    MAX_LENGTH: 100,
  },
} as const;
