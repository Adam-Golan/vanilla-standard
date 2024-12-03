import './modal.scss';

export class Modal extends HTMLDivElement {
    private dialog: HTMLDialogElement

    constructor(private appendFn: ParentNode['append'], private content: Node | string) {
        super();
    }

    protected init(): void {
        this.dialog = document.createElement('dialog');
        const closeBtn = document.createElement('span');
        this.dialog.className = 'modal';
        closeBtn.className = 'close';
        closeBtn.onclick = () => this.closeModal();
        this.dialog.onclick = ({ clientX, clientY }) => {
            const { top, left, width, height } = this.dialog.getBoundingClientRect();
            const isInDialog = (top <= clientY && clientY <= top + height && left <= clientX && clientX <= left + width);
            if (!isInDialog) this.closeModal();
        }
        this.dialog.append(this.content, closeBtn);
        this.appendFn(this.dialog);
        this.dialog.showModal();
    }

    closeModal() {
        this.dialog.remove();
    }
}