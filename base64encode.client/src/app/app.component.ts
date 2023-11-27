import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent implements OnInit {

  result: String = "";
  encodedText: String = "";
  isEncodingInProgress: boolean = false;

  public forecasts: WeatherForecast[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getForecasts();
  }

  getForecasts() {
    this.http.get<WeatherForecast[]>('/weatherforecast').subscribe(
      (result) => {
        this.forecasts = result;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  title = 'base64encode.client';

  //clickme(txtInput: string) {
  //  this.result = txtInput;
  //}

  encodeText(txtInput: string) {
    if (this.isEncodingInProgress) {
      return;
    }

    this.isEncodingInProgress = true;


    this.http.post<any>('https://localhost:7242/Base64Encode/encode/', { text: JSON.stringify(txtInput) })
      .subscribe(response => {
        this.result = "Success";
      }, error => {
        alert("error");
        });
  }

  handleReceivedCharacter(character: string) {
    this.encodedText += character;
  }

  cancelEncoding() {
    // Implement logic for cancelling the encoding process
    this.isEncodingInProgress = false;
  }
}
