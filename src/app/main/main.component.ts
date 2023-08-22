import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface Tab {
  title: string;
  url: string;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  responseData: any;
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}
  
  ngOnInit(): void {
    this.handleButtonClick()
  }

  handleButtonClick(): void {
    const url = 'https://localhost:5001/User/Papi';
    this.http.get(url).subscribe(
      (response) => {
        this.responseData = response;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  
  public isMenuOpen: boolean = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  @Input() iframeSrc: SafeResourceUrl | string ='';
  showIframe(url : string): void {
    this.iframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }

  showCard: boolean = false;

  openCard(url: string) {
    this.showCard = true;
    this.iframeSrc = url;
  }

  closeCard() {
    this.showCard = false;
    this.iframeSrc = '';
  }

  tabs: Tab[] =[];

  addTab() {
    this.tabs.push({
      title: 'New Tab',
      url: 'about:blank'
    });
  }

  closeTab(index: number) {
    this.tabs.slice(index, 1);
  }

}