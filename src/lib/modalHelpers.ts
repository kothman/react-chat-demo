export default {
    toggle: (id: string) => {
        let modal: HTMLElement = document.getElementById(id);
        if(modal.classList.contains('active'))
            modal.classList.remove('active');
        else
            modal.classList.add('active');
    },
    dismiss: (id: string) => {
        let modal: HTMLElement = document.getElementById(id);
        if (modal.classList.contains('active'))
            modal.classList.remove('active');
 
    }
};