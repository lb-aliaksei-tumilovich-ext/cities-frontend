import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {ErrorService} from "./service/error/error.service";
import {NotificationService} from "./service/notification/notification.service";
import {LoggerService} from "./service/logger/logger.service";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private injector: Injector) { }

  handleError(error: Error | HttpErrorResponse) {
    const errorService = this.injector.get(ErrorService);
    const logger = this.injector.get(LoggerService);
    const notifier = this.injector.get(NotificationService);

    let message;
    let stack;
    if (error instanceof HttpErrorResponse) {
      // Server error
      message = errorService.getServerErrorMessage(error);
      //stackTrace = errorService.getServerErrorStackTrace(error);
      notifier.showError(message);
    } else {
      // Client Error
      message = errorService.getClientErrorMessage(error);
      notifier.showError(message);
    }
    logger.logError(message);
    console.error(error);
  }
}
