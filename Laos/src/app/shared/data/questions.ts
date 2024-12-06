import { Question } from '../models/question.model';
import { environment } from '../../../environments/environment';

export const sections = [
    'Introduction',
    'Personal Information',
    'Case Details',
    'Review'
];

const testQuestions: Question[] = [
    {
        id: 'introduction',
        text: 'Press begin to get started.',
        type: 'info',
        section: 0,
        required: false
    },
    {
        id: 'case-description',
        text: 'Case Overview (test)',
        type: 'text',
        section: 2,
        required: true
    },
    {
        id: 'section-end',
        text: 'Thank you for your time! Please review your information and ensure it is accurate.<br>',
        type: 'info',
        section: 3
    }
];

const baseQuestions: Question[] = [
  {
    id: 'introduction',
    text: 'Press begin to get started.',
    type: 'info',
    section: 0,
    required: false
  },
  {
    id: 'full-legal-name',
    text: 'Full Legal Name',
    type: 'text',
    section: 1,
    required: true
  },
  {
    id: 'date-of-birth',
    text: 'Date of Birth',
    type: 'date',
    section: 1,
    required: true
  },
  {
    id: 'email-address',
    text: 'Email Address',
    type: 'email',
    section: 1,
    required: true
  },
  {
    id: 'phone-number',
    text: 'Phone Number',
    type: 'tel',
    section: 1,
    required: true
  },
  {
    id: 'street-address',
    text: 'Street Address',
    type: 'text',
    section: 1,
    required: true
  },
  {
    id: 'currently-employed',
    text: 'Current Employment Status',
    type: 'radio',
    section: 1,
    required: true,
    options: [
      { value: 'employed', label: 'Employed' },
      { value: 'unemployed', label: 'Unemployed' }
    ]
  },
  {
    id: 'employer-name',
    text: 'Name of Employer',
    type: 'text',
    section: 1,
    required: true
  },
  {
    id: 'income-type',
    text: 'Income Type',
    type: 'radio',
    section: 1,
    required: true,
    options: [
      { value: 'hourly', label: 'Hourly' },
      { value: 'salary', label: 'Salary' }
    ]
  },
  {
    id: 'marital-status',
    text: 'Current Marital Status',
    type: 'radio',
    section: 1,
    required: true,
    options: [
      { value: 'married', label: 'Married' },
      { value: 'single', label: 'Single' },
      { value: 'separated', label: 'Separated' },
      { value: 'other', label: 'Other' }
    ]
  },
  {
    id: 'case-description',
    text: 'Case Overview',
    type: 'text',
    section: 1,
    required: true
  },
  {
    id: 'section-end',
    text: 'Thank you for your time! Please review your information and ensure it is accurate.<br>',
    type: 'info',
    section: 3
  },
  {
    id: 'post-submit',
    text: 'Thank you for your submission!',
    type: 'info',
    section: 3
  }
];

const testQuestionSets: Record<string, Question[]> = {
    'divorce': [
      {
        id: 'marriage-length',
        text: 'How long have you been married?',
        type: 'text',
        required: true,
        section: 2
      },
      {
        id: 'children-count',
        text: 'How many children do you have?',
        type: 'number',
        required: true,
        section: 2
      }
    ],
    'child-support': [
      {
        id: 'children-count',
        text: 'How many children require support?',
        type: 'number',
        required: true,
        section: 2
      },
      {
        id: 'support-amount',
        text: 'What is the desired child support amount?',
        type: 'number',
        required: true,
        section: 2
      }
    ],
    'adoption': [
      {
        id: 'adoption-type',
        text: 'What type of adoption are you pursuing?',
        type: 'radio',
        required: true,
        section: 2,
        options: [
          { value: 'domestic', label: 'Domestic' },
          { value: 'international', label: 'International' },
          { value: 'stepchild', label: 'Stepchild' }
        ]
      }
    ],
    'child-custody': [
      {
        id: 'custody-type',
        text: 'What type of custody arrangement are you seeking?',
        type: 'radio',
        required: true,
        section: 2,
        options: [
          { value: 'sole', label: 'Sole Custody' },
          { value: 'joint', label: 'Joint Custody' },
          { value: 'shared', label: 'Shared Custody' }
        ]
      }
    ],
    'probate': [
      {
        id: 'estate-value',
        text: 'What is the estimated value of the estate?',
        type: 'number',
        required: true,
        section: 2
      }
    ],
    'estate-planning': [
      {
        id: 'will-prepared',
        text: 'Do you have a will prepared?',
        type: 'radio',
        required: true,
        section: 2,
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]
      }
    ],
    'prenuptial': [
      {
        id: 'assets-list',
        text: 'Please list the assets to be included in the pre-nup.',
        type: 'text',
        required: true,
        section: 2
      }
    ],
    'protection-order': [
      {
        id: 'protection-reason',
        text: 'What is the reason for seeking an order of protection?',
        type: 'text',
        required: true,
        section: 2
      }
    ],
    'other': [
      {
        id: 'additional-info',
        text: 'Please provide any additional information relevant to your case.',
        type: 'text',
        required: true,
        section: 2
      }
    ]
  };

const baseQuestionSets: Record<string, Question[]> = {
  'divorce': [
    {
      id: 'marriage-length',
      text: 'How long have you been married?',
      type: 'text',
      required: true,
      section: 2
    },
    {
      id: 'children-count',
      text: 'How many children do you have?',
      type: 'number',
      required: true,
      section: 2
    },
    {
      id: 'separation-date',
      text: 'What is your date of separation?',
      type: 'date',
      required: true,
      section: 2
    }
  ],
  'child-support': [
    {
      id: 'children-count',
      text: 'How many children require support?',
      type: 'number',
      required: true,
      section: 2
    },
    {
      id: 'support-amount',
      text: 'What is the desired child support amount?',
      type: 'number',
      required: true,
      section: 2
    },
    {
      id: 'custody-arrangement',
      text: 'What is the current custody arrangement?',
      type: 'radio',
      required: true,
      section: 2,
      options: [
        { value: 'sole', label: 'Sole Custody' },
        { value: 'joint', label: 'Joint Custody' },
        { value: 'shared', label: 'Shared Custody' }
      ]
    }
  ],
  'adoption': [
    {
      id: 'adoption-type',
      text: 'What type of adoption are you pursuing?',
      type: 'radio',
      required: true,
      section: 2,
      options: [
        { value: 'domestic', label: 'Domestic' },
        { value: 'international', label: 'International' },
        { value: 'stepchild', label: 'Stepchild' }
      ]
    },
    {
      id: 'child-age',
      text: 'What is the age of the child you wish to adopt?',
      type: 'number',
      required: true,
      section: 2
    }
  ],
  'child-custody': [
    {
      id: 'custody-type',
      text: 'What type of custody arrangement are you seeking?',
      type: 'radio',
      required: true,
      section: 2,
      options: [
        { value: 'sole', label: 'Sole Custody' },
        { value: 'joint', label: 'Joint Custody' },
        { value: 'shared', label: 'Shared Custody' }
      ]
    },
    {
      id: 'current-arrangement',
      text: 'What is your current arrangement?',
      type: 'text',
      required: true,
      section: 2
    }
  ],
  'probate': [
    {
      id: 'estate-value',
      text: 'What is the estimated value of the estate?',
      type: 'number',
      required: true,
      section: 2
    },
    {
      id: 'will-exists',
      text: 'Does the deceased have a will?',
      type: 'radio',
      required: true,
      section: 2,
      options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
        { value: 'unknown', label: 'Unknown' }
      ]
    }
  ],
  'estate-planning': [
    {
      id: 'will-prepared',
      text: 'Do you have a will prepared?',
      type: 'radio',
      required: true,
      section: 2,
      options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' }
      ]
    },
    {
      id: 'estate-value',
      text: 'What is the estimated value of your estate?',
      type: 'number',
      required: true,
      section: 2
    }
  ],
  'prenuptial': [
    {
      id: 'assets-list',
      text: 'Please list the assets to be included in the pre-nup.',
      type: 'text',
      required: true,
      section: 2
    },
    {
      id: 'marriage-date',
      text: 'What is your planned marriage date?',
      type: 'date',
      required: true,
      section: 2
    }
  ],
  'protection-order': [
    {
      id: 'protection-reason',
      text: 'What is the reason for seeking an order of protection?',
      type: 'text',
      required: true,
      section: 2
    },
    {
      id: 'urgency',
      text: 'Is this an emergency situation?',
      type: 'radio',
      required: true,
      section: 2,
      options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' }
      ]
    }
  ],
  'other': [
    {
      id: 'case-type',
      text: 'What type of legal matter is this regarding?',
      type: 'text',
      required: true,
      section: 2
    },
    {
      id: 'additional-info',
      text: 'Please provide any additional information relevant to your case.',
      type: 'text',
      required: true,
      section: 2
    }
  ]
};

export const questions: Question[] = environment.production
    ? baseQuestions
    : testQuestions;

export const questionSets: Record<string, Question[]> = environment.production
    ? baseQuestionSets
    : testQuestionSets;
