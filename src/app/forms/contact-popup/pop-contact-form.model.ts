// pop-contact-form.model.ts
export class PopContactForm {
  fullName: string;
  mobile: string;
  email: string;
  message: string;
  selectedPlan: string;
  preferredLocation: string;

  constructor(
    fullName: string,
    mobile: string,
    email: string,
    message: string,
    selectedPlan: string,
    preferredLocation: string
  ) {
    this.fullName = fullName;
    this.mobile = mobile;
    this.email = email;
    this.message = message;
    this.selectedPlan = selectedPlan;
    this.preferredLocation = preferredLocation;
  }
}
