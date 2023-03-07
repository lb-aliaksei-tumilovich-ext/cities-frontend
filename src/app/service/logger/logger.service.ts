import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  logInfo(message: string) {
    // Send errors to be saved here
    // The console.log is only for testing this example.
    console.log(message);
  }
  logError(message: string) {
    // Send errors to be saved here
    // The console.log is only for testing this example.
    console.log('LoggingService: ' + message);
  }
}
