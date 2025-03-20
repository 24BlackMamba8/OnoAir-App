import { Injectable } from '@angular/core';
import { Help } from '../models/help.model';

@Injectable({
  providedIn: 'root',
})
export class HelpSupportService {
  private helpTopics: Help[] = [
    {
      title: 'How to Book a Flight',
      content: 'Step-by-step instructions to book a flight...',
    },
    {
      title: 'How to Cancel a Booking',
      content: 'Details on how to cancel your flight reservation...',
    },
  ];

  getAllHelpTopics(): Help[] {
    return this.helpTopics;
  }

  getHelpDetails(title: string): Help | undefined {
    return this.helpTopics.find(topic => topic.title === title);
  }
}
