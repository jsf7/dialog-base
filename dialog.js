export class Dialog {
    constructor(options) {
        this.config(options);
        this.init();
    }

    create() {
        this.root = document.createElement('div');
        this.root.className = 'dialog';

        this.header = document.createElement('div');
        this.header.className = 'dialog-header';
        this.header.innerHTML = `<span class="dialog-title">${this.settings.title || ''}</span>`;

        const closeButton = document.createElement('span');
        closeButton.className = 'dialog-close';
        closeButton.addEventListener('click', e => {
            event.preventDefault();
            this.remove();
        })

        this.header.appendChild(closeButton);

        this.content = document.createElement('div');
        this.content.className = 'dialog-content';
        this.content.innerHTML = this.settings.content;
        this.content.style.width = this.settings.width;

        this.overlay = document.createElement('div');
        this.overlay.className = 'dialog-overlay';

        this.root.appendChild(this.header);
        this.root.appendChild(this.content);
        document.body.appendChild(this.overlay);
        document.body.appendChild(this.root);

    }

    remove() {
        this.root.remove();
        this.overlay.remove();
    }

    

    style() {
        if(Dialog._hasStyle) {
            return;
        }
        Dialog._hasStyle = true;
        const style = document.createElement('style');

        style.textContent = `
            .dialog, .dialog-overlay{
                position: fixed;
                z-index: 1000;
            }

            .dialog-overlay{
                top:0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0,0,0,.1);
            }

            .dialog{
                background-color: white;
                border-radius: 5px;
                box-shadow: 0 0 20px -10px rgba(0,0,0,.3);
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }

            .dialog-content{
                padding: 20px;
                max-height: calc(100vh - 200px);
                overflow: auto;
            }

            .dialog-header{
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 20px;
                border-bottom: 1px solid silver;

            }



            .dialog-close{
                cursor: pointer;
                margin-inline-start: 20px;
            }

            .dialog-close:after{
                content: 'x'
            }

            .dialog-title{
                font-weight: bold;
                opacity: .5;
                font-size: 12px;
                text-transform: uppercase;
            }

        `;

        document.head.appendChild(style);
    }

    init() {
        this.create();
        this.style();
    }

    config(options = {}) {
        const defaults = {
            content: ``,
            title: 'Dialog example',
            width: 'auto'
        };

        this.settings = Object.assign({}, defaults, options);
    }
}
