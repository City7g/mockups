<template>
  <section class="section-first">
    <div class="container">
      <div class="section-first__wrap">
        <h1 class="title-h1 section-first__title">Test assignment for front-end developer</h1>
        <p class="text-main section-first__text">What defines a good front-end developer is one that has skilled
          knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web
          interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End
          Development keeps evolving.</p>
        <BaseButton text="Sign up" />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.section-first {
  color: $white;
  text-align: center;

  & .container {
    background: center / cover no-repeat url('~@/assets/first-section-bg.jpg');
  }

  &__wrap {
    padding: 50px 0;
    max-width: 380px;
    margin: 0 auto;
    min-height: 650px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media(max-width: 991px) {
      min-height: 500px;
    }

    @media(max-width: 576px) {
    padding: 40px 0;
    display: block;
    }
  }

  &__title {
    margin-bottom: 21px;
  }

  &__text {
    margin-bottom: 32px;
  }
}
</style>
