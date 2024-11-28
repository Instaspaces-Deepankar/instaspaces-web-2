import {isDevMode} from '@angular/core';

export const environment = {
  apiUrl: isDevMode() ? 'http://localhost:9000' : 'https://api.instaspaces.in',
  returnUrl: isDevMode() ? 'http://localhost:4200' : 'https://www.instaspaces.in',
  cashfree: isDevMode() ? 'sandbox' : 'production',
  production: !isDevMode(),
};
