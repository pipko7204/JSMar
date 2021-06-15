export const getRandom = (num) => Math.ceil(Math.random() * num);

export function createElement(tag, className) {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className)
    }


    return $tag;
}
