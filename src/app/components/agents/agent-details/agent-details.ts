import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import * as Highcharts from 'highcharts';
import { AgentService } from '../../../services/agent.service';
import { Agent } from '../../../models/agent.model';
import { AppModal } from '../../shared/app-modal/app-modal';
import { ChatModal, ChatContact } from '../../shared/chat-modal/chat-modal';

@Component({
  selector: 'app-agent-details',
  standalone: true,
  imports: [CommonModule, AppModal, ChatModal],
  templateUrl: './agent-details.html',
  styleUrl: './agent-details.css',
})
export class AgentDetails implements OnInit, AfterViewInit {
  agent?: Agent;

  // Delete Confirmation Modal
  modalOpen = false;
  modalMessage = '';

  // Chat Modal
  showChatModal = false;
  chatContact?: ChatContact;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private agentService: AgentService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.agent = this.agentService.getAgentById(id);
    }

    if (!this.agent) {
      this.agent = this.agentService.getAgentById('5') || this.agentService.getAgents()[0];
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.renderCharts();
    }, 50);
  }

  renderCharts(): void {
    if (!this.agent) return;

    const stats = this.agent.stats || { total: 243, sold: 136, rented: 105 };

    // Card 1: Total (Navy background, Orange Donut)
    this.renderMiniDonut('chartTotal', stats.total, 300, '#fa8b3c', '#253856');

    // Card 2: Sold (White background, Green Donut)
    this.renderMiniDonut('chartSold', stats.sold, 200, '#10b981', '#f1f5f9');

    // Card 3: Rented (White background, Blue Donut)
    this.renderMiniDonut('chartRented', stats.rented, 200, '#3b82f6', '#f1f5f9');
  }

  renderMiniDonut(
    elementId: string,
    value: number,
    max: number,
    color: string,
    trackColor: string
  ): void {
    const el = document.getElementById(elementId);
    if (!el) return;

    const remaining = Math.max(max - value, 0);

    Highcharts.chart(elementId, {
      chart: {
        type: 'pie',
        backgroundColor: 'transparent',
        height: 70,
        width: 70,
        margin: [0, 0, 0, 0],
        spacing: [0, 0, 0, 0],
      },
      title: { text: '' },
      credits: { enabled: false },
      tooltip: { enabled: false },
      plotOptions: {
        pie: {
          innerSize: '65%',
          borderWidth: 0,
          dataLabels: { enabled: false },
          states: { hover: { halo: { size: 0 } } },
        },
      },
      series: [
        {
          type: 'pie',
          name: 'Stat',
          data: [
            { name: 'Value', y: value, color: color },
            { name: 'Remaining', y: remaining, color: trackColor },
          ],
        },
      ],
    });
  }

  deleteAgent(): void {
    if (this.agent) {
      this.modalMessage = `هل أنت متأكد من حذف الوكيل "${this.agent.name}"؟`;
      this.modalOpen = true;
    }
  }

  confirmDeleteAgent(): void {
    this.modalOpen = false;
    if (this.agent) {
      this.agentService.deleteAgent(this.agent.id).subscribe(() => {
        this.router.navigate(['/agents']);
      });
    }
  }

  cancelDeleteAgent(): void {
    this.modalOpen = false;
  }

  openChat(): void {
    if (this.agent) {
      this.chatContact = {
        name: this.agent.name,
        image: this.agent.image,
        role: this.agent.type,
        phone: this.agent.phone,
      };
      this.showChatModal = true;
    }
  }

  closeChat(): void {
    this.showChatModal = false;
  }

  goBack(): void {
    this.router.navigate(['/agents']);
  }
}
