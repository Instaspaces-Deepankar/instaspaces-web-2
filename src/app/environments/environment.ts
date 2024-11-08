import {isDevMode} from '@angular/core';

export const environment = {
  apiUrl: isDevMode() ? ' https://api.instaspaces.in' : 'http://localhost:9000',
  returnUrl: isDevMode() ? 'http://localhost:4200' : 'https://www.instaspaces.in',
  cashfree: isDevMode() ? 'sandbox' : 'production',
  production: !isDevMode(),
};
