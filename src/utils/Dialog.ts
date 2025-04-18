
import $ from 'jquery';

interface DialogInput {
  type?: string;
  placeholder?: string;
  [key: string]: string | undefined;
}

interface LoginInput {
  [key: string]: string | undefined;
}

interface DialogParams {
  title?: string;
  message?: string;
  button?: string;
  cancel?: string;
  required?: boolean;
  position?: string;
  animation?: string;
  hasButton?: boolean;
  input?: DialogInput;
  first?: LoginInput;
  second?: LoginInput;
  validate?: (val: string) => boolean | void;
  callback?: (val: any) => void;
}

const meta = document.querySelector<HTMLMetaElement>('[name="bivalert"]');

if (meta && meta.content === 'true') {
 

  const dialog = {
    defaultParams: {
      title: '',
      message: '',
      button: 'Ok',
      cancel: 'Cancel',
      required: false,
      position: 'fixed',
      animation: 'scale',
      input: {
        type: 'text'
      },
      validate: () => {},
      callback: () => {}
    } as DialogParams,

    transitionEnd: 'transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd',

    overlay: undefined as JQuery<HTMLElement> | undefined,
    holder: undefined as JQuery<HTMLElement> | undefined,

    alert(params: DialogParams) {
      this.appendDialogHolder();
      const b = $.extend(true, {}, this.defaultParams, params);
      const id = this.generateRandomId();

      const button = b.hasButton === false ? '' : `<div class="dialog-confirm">${b.button}</div>`;
      const html = `
        <div class="dialog-alert" id="${id}">
          <div class="dialog-border"></div>
          <div class="dialog-title">${b.title}</div>
          <div class="dialog-message">${b.message}</div>
          <div class="dialog-close">&times;</div>
          ${button}
          <div class="dialog-clearFloat"></div>
        </div>`;

      this.holder!.find('td').append(html);

      const el = $(`#${id}`);
      const confirm = el.find('.dialog-confirm');
      const close = el.find('.dialog-close');

      if (b.required) close.remove();

      el.attr('data-dialog-position', b.position!);
      el.attr('data-dialog-animation', b.animation!);

      this.injectDialog();

      confirm.one('click.dialog', () => b.callback?.(true));
      close.one('click.dialog', () => b.callback?.(null));
    },

    prompt(params: DialogParams) {
      this.appendDialogHolder();
      const b = $.extend(true, {}, this.defaultParams, params);
      const id = this.generateRandomId();
      let attrs = '';

      for (const key in b.input!) {
        attrs += ` ${key}="${b.input![key]}"`;
      }

      const html = `
        <div class="dialog-alert" id="${id}">
          <div class="dialog-border"></div>
          <div class="dialog-title">${b.title}</div>
          <div class="dialog-message">${b.message}</div>
          <label><input ${attrs} /></label>
          <div class="dialog-close">&times;</div>
          <div class="dialog-confirm">${b.button}</div>
          <div class="dialog-clearFloat"></div>
        </div>`;

      this.holder!.find('td').append(html);

      const el = $(`#${id}`);
      const confirm = el.find('.dialog-confirm');
      const close = el.find('.dialog-close');
      const input = el.find('input');

      if (b.required) close.remove();

      el.attr('data-dialog-position', b.position!);
      el.attr('data-dialog-animation', b.animation!);

      this.injectDialog();

      confirm.on('click.dialog', () => {
        const val = input.val() as string;
        const valid = b.validate!(val) !== false;

        if (b.required && val === '') {
          this.shakeDialog(el);
          return false;
        }

        if (valid) {
          b.callback?.(val);
          return true;
        } else {
          this.shakeDialog(el);
          return false;
        }
      });

      close.one('click.dialog', () => b.callback?.(null));
    },

    login(params: DialogParams) {
      this.appendDialogHolder();
      const b = $.extend(true, {}, this.defaultParams, params);
      const id = this.generateRandomId();

      let firstAttr = '';
      let secondAttr = '';

      for (const key in b.first!) firstAttr += ` ${key}="${b.first![key]}"`;
      for (const key in b.second!) secondAttr += ` ${key}="${b.second![key]}"`;

      const html = `
        <div class="dialog-alert" id="${id}">
          <div class="dialog-border"></div>
          <div class="dialog-title">${b.title}</div>
          <div class="dialog-message">${b.message}</div>
          <label><input class="first" ${firstAttr} /></label>
          <label><input class="second" ${secondAttr} /></label>
          <div class="dialog-close">&times;</div>
          <div class="dialog-confirm">${b.button}</div>
          <div class="dialog-clearFloat"></div>
        </div>`;

      this.holder!.find('td').append(html);

      const el = $(`#${id}`);
      const confirm = el.find('.dialog-confirm');
      const close = el.find('.dialog-close');
      const firstInput = el.find('input.first');
      const secondInput = el.find('input.second');

      if (b.required) close.remove();

      el.attr('data-dialog-position', b.position!);
      el.attr('data-dialog-animation', b.animation!);

      this.injectDialog();

      confirm.on('click.dialog', () => {
        const val1 = firstInput.val() as string;
        const val2 = secondInput.val() as string;
      
        const valid1 = b.validate!(val1) !== false;
        const valid2 = b.validate!(val2) !== false;
      
        if (b.required && (val1 === '' || val2 === '')) {
          return this.shakeDialog(el);
        }
      
        if (valid1 && valid2) {
          b.callback?.({ value1: val1, value2: val2 });
          return true; // Explicit return
        } else {
          return this.shakeDialog(el);
        }
      });

      close.one('click.dialog', () => b.callback?.(null));
    },

    confirm(params: DialogParams) {
      this.appendDialogHolder();
      const b = $.extend(true, {}, this.defaultParams, params);
      const id = this.generateRandomId();

      const html = `
        <div class="dialog-alert" id="${id}">
          <div class="dialog-border"></div>
          <div class="dialog-title">${b.title}</div>
          <div class="dialog-message">${b.message}</div>
          <div class="dialog-close">&times;</div>
          <div class="dialog-confirm">${b.button}</div>
          <div class="dialog-cancel">${b.cancel}</div>
          <div class="dialog-clearFloat"></div>
        </div>`;

      this.holder!.find('td').append(html);

      const el = $(`#${id}`);
      const confirm = el.find('.dialog-confirm');
      const cancel = el.find('.dialog-cancel');
      const close = el.find('.dialog-close');

      if (b.required) close.remove();

      el.attr('data-dialog-position', b.position!);
      el.attr('data-dialog-animation', b.animation!);

      this.injectDialog();

      confirm.one('click.dialog', () => b.callback?.(true));
      cancel.one('click.dialog', () => b.callback?.(false));
      close.one('click.dialog', () => b.callback?.(null));
    },

    generateRandomId(): string {
      return `${Math.floor(1e6 * Math.random()) + 1}${Date.now()}`;
    },

    showDialog() {
      $(':focus').blur();
      const current = $('.dialog-alert:first');

      if (current.attr('data-dialog-position') === 'absolute') {
        this.holder!.removeClass('dialog-fixed').css('top', $(window).scrollTop() as number);
      } else {
        this.holder!.addClass('dialog-fixed').css('top', '');
      }

      $(window).trigger('resize.dialog');
      $('.dialog-alert').hide();
      current.show();

      setTimeout(() => {
        current
          .on(this.transitionEnd, function (e:any) {
            if ($(e.target).is(this)) {
              $(this).off(dialog.transitionEnd);
              dialog.focusElement(current.find('input.first')[0], current.find('input.second')[0], true);
            }
          })
          .addClass('dialog-visible');
      }, 1);

      $('html').addClass('dialogIsVisible');
    },

    injectDialog() {
      if ($('.dialog-alert:visible').length === 0) {
        this.showDialog();
      } else {
        $('.dialog-alert:last').hide();
      }
      this.overlay!.addClass('dialog-visible');
    },

    shakeDialog(el: JQuery) {
      el
        .one('webkitAnimationEnd oanimationend msAnimationEnd animationend', () => {
          el.removeClass('dialog-shaking');
        })
        .addClass('dialog-shaking');
      return false;
    },

    focusElement(el1?: HTMLElement, el2?: HTMLElement, setCursor = false) {
      const el = el1 || el2;
      if (el) {
        $(el)
          .one('blur.dialog', () => {
            this.focusElement(el, undefined);
          })
          .focus();

        if (setCursor && (el as HTMLInputElement).selectionStart !== undefined) {
          const input = el as HTMLInputElement;
          input.setSelectionRange(input.value.length, input.value.length);
          input.scrollLeft = input.scrollWidth;
        }
      }
    },

    appendDialogHolder() {
      if (!this.holder) {
        $('body').append('<div id="dialog-overlay"></div><div id="dialog-holder"><table id="dialog-center"><tr><td></td></tr></table></div>');
        this.overlay = $('#dialog-overlay');
        this.holder = $('#dialog-holder');
        this.bindDialogGlobalEvents();
        $('html').addClass('dialogHolderIsVisible');
      }
    },

    removeDialogHolder() {
      this.unbindDialogGlobalEvents();
      this.overlay?.remove();
      this.holder?.remove();
      this.overlay = undefined;
      this.holder = undefined;
      $('html').removeClass('dialogHolderIsVisible');
    },

    close() {
      const current = $('.dialog-alert:not(.dialog-closing):first');
      current
        .addClass('dialog-closing')
        .on(this.transitionEnd, function (e:any) {
          if ($(e.target).is(this)) {
            $(this).off(dialog.transitionEnd).remove();
            $('html').removeClass('dialogIsVisible');

            if ($('.dialog-alert').length === 0) {
              dialog.overlay!
                .addClass('dialog-closing')
                .on(dialog.transitionEnd, function (e) {
                  if ($(e.target).is(this)) {
                    $(this).off(dialog.transitionEnd);
                    dialog.removeDialogHolder();
                  }
                })
                .removeClass('dialog-visible');
            } else {
              dialog.showDialog();
            }
          }
        })
        .removeClass('dialog-visible');
    },

    bindDialogGlobalEvents() {
      this.holder!.add(this.overlay!).on('click.dialog', (e:any) => {
        if (!$(e.target).closest('.dialog-alert').is('.dialog-alert')) {
          $('.dialog-close:visible').trigger('click');
        }
      });

      $(document).on('click.dialog', '.dialog-confirm, .dialog-cancel, .dialog-close', () => {
        this.close();
        return false;
      });

      $(document).on('keyup.dialog', (e:any) => {
        if (e.key === 'Escape' && $('.dialog-alert:visible').length > 0) {
          $('.dialog-close:visible').trigger('click');
        }
      });

      $(document).on('keydown.dialog', (e:any) => {
        if (e.key === 'Enter' && $('.dialog-alert:visible').length > 0) {
          $('.dialog-confirm').trigger('click');
          return false;
        }
        return undefined;
      });

      $(window).on('resize.dialog', () => {
        this.overlay!.height('100%').height($(document).height() as number | string);
      });
    },

    unbindDialogGlobalEvents() {
      this.overlay?.off('.dialog');
      this.holder?.off('.dialog');
      $(document).off('.dialog');
      $(window).off('.dialog');
    }
  };

  // Expor para uso externo
  (window as any).dialog = dialog;
}
