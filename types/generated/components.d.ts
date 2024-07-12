import type { Schema, Attribute } from '@strapi/strapi';

export interface AdditionalCommunitySession extends Schema.Component {
  collectionName: 'components_additional_community_sessions';
  info: {
    displayName: 'Community Session';
    icon: 'calendar';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    date: Attribute.DateTime;
    image: Attribute.Media<'images'>;
    description: Attribute.RichText;
    status: Attribute.Enumeration<['open', 'closed', 'answered']> &
      Attribute.DefaultTo<'open'>;
  };
}

export interface AdditionalSocialLink extends Schema.Component {
  collectionName: 'components_additional_social_links';
  info: {
    displayName: 'Social Link';
    icon: 'link';
    description: '';
  };
  attributes: {
    name: Attribute.String;
    link: Attribute.String;
    icon: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'additional.community-session': AdditionalCommunitySession;
      'additional.social-link': AdditionalSocialLink;
    }
  }
}
