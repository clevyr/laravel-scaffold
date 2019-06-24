export function inputState(field, form) {
    if (!form) form = this.$v.form;

    return form[field].$dirty ? !form[field].$error : null;
}
