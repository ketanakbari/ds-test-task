import Swal from 'sweetalert2';

export function exportErrorMessage(message: string): void {
  Swal.fire({
    icon: 'error',
    title: message,
    timer: 3000,
    showCancelButton: false,
    showConfirmButton: false,
    position: 'top-right',
    backdrop: false,
    customClass: {
      container: 'sw-container-class',
    }
  });
}
