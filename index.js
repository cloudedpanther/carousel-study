// JavaScript

class JSSlider {
  constructor($container, items) {
    this.$container = $container;
    this.items = items;
    this.$prevButton = null;
    this.$nextButton = null;
    this.currentIndex = 0;
    this.handleMovePrev = this.handleMovePrev.bind(this);
    this.handleMoveNext = this.handleMoveNext.bind(this);
  }

  getPrevIndex() {
    return (this.currentIndex + this.items.length - 1) % this.items.length;
  }

  getNextIndex() {
    return (this.currentIndex + 1) % this.items.length;
  }

  disableButtons() {
    this.$prevButton.classList.add('disabled');
    this.$nextButton.classList.add('disabled');
  }

  enableButtons() {
    this.$prevButton.classList.remove('disabled');
    this.$nextButton.classList.remove('disabled');
  }

  handleMovePrev() {
    const prevIndex = this.getPrevIndex();

    this.$container.style.transform = 'translateX(-100%)';
    this.$container.innerHTML =
      this.items[prevIndex] + this.$container.innerHTML;
    this.currentIndex = prevIndex;

    this.disableButtons();

    setTimeout(() => {
      this.$container.classList.add('moving');
      this.$container.style.transform = 'translateX(0%)';
    }, 100);

    setTimeout(() => {
      this.$container.classList.remove('moving');
      this.$container.style.transform = '';
      this.$container.innerHTML = this.items[this.currentIndex];
      this.enableButtons();
    }, 500);
  }

  handleMoveNext() {
    const nextIndex = this.getNextIndex();

    this.$container.innerHTML += this.items[nextIndex];
    this.currentIndex = nextIndex;

    this.disableButtons();

    setTimeout(() => {
      this.$container.classList.add('moving');
      this.$container.style.transform = 'translateX(-100%)';
    }, 100);

    setTimeout(() => {
      this.$container.classList.remove('moving');
      this.$container.style.transform = '';
      this.$container.innerHTML = this.items[this.currentIndex];
      this.enableButtons();
    }, 500);
  }

  init() {
    this.$container.innerHTML = this.items[this.currentIndex];

    this.$prevButton = this.$container.parentNode.querySelector('.prev-button');
    this.$nextButton = this.$container.parentNode.querySelector('.next-button');

    this.$prevButton.addEventListener('click', this.handleMovePrev);
    this.$nextButton.addEventListener('click', this.handleMoveNext);
  }
}

const $slideContainer = document.querySelector('.slide2-container');
const slideItems = Array.from(
  { length: 3 },
  (_, i) => `<div class="slide2-item">${i + 1}</div>`,
);

const slider = new JSSlider($slideContainer, slideItems);
slider.init();
