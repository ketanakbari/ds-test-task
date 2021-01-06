export function checkFormControlHasError(form: any, controlName: string, validationType: string): boolean {
  const control = form.controls[controlName];
  if (!control) {
    return false;
  }

  return control.hasError(validationType) && (control.dirty || control.touched);
}
