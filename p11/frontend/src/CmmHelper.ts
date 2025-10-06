class CmmHelper {
    public AddPageTitle(output: HTMLDivElement, label: string) {
        $(`<div class="page-title">`).text(label).appendTo(output)[0] as HTMLLabelElement
    }

}