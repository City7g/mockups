<template>
	<header class="header">
		<div class="container">
			<div class="header__wrap">
				<a href="#" class="header__logo">
					<img src="@/assets/header-logo.svg" alt="">
				</a>

				<BaseButton text="Users" />
				<BaseButton text="Sign up" />
			</div>
		</div>
	</header>
</template>

<style lang="scss">
.header {
	background-color: $white;

	&__wrap {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 10px;
		height: 60px;
	}

	&__logo {
    display: flex;
		margin-right: auto;
	}
}
</style>