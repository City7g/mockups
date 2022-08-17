<script setup>
import { reactive, onMounted } from 'vue'
import { useUsersStore } from '../stores/user.js'
const userStore = useUsersStore()

onMounted(async () => {
	setTimeout(async () => {
		await userStore.loadUsers()
	}, 1000)
})

const loadMore = async () => {
	await userStore.loadUsers()
}

const filterPhone = phone => {
	phone = phone.replace(/[^\d]/g, '')
	return phone.replace(/(\d{2})(\d{3})(\d{3})(\d{2})(\d{2})/, '+$1 ($2) $3 $4 $5')
}

// Tooltip
const tooltipSetting = reactive({
	title: 'Text',
	left: '50%',
	top: '50%',
	show: false
})

const enter = (e, title) => {
	const params = e.target.getBoundingClientRect()
	tooltipSetting.show = true
	tooltipSetting.title = title
	if (e.target.scrollWidth + e.clientX > window.innerWidth - 20) {
		if (window.innerWidth * 0.6 > e.target.scrollWidth) {
			tooltipSetting.left = (window.innerWidth - 42) - e.target.scrollWidth
		} else {
			tooltipSetting.left = (window.innerWidth - 20) - window.innerWidth * 0.6
		}
	} else {
		tooltipSetting.left = e.clientX - 12
	}
	if (e.clientY > window.innerHeight - 70) {
		tooltipSetting.top = params.top - params.height - 10
	} else {
		tooltipSetting.top = params.top + params.height + 10
	}
}

const leave = () => {
	tooltipSetting.show = false
}
</script>

<template>
	<section class="section-users" id="section-users">
		<div class="container">
			<h2 class="title-h1 section-users__title">Working with GET request</h2>

			<div v-if="userStore.usersList.length" class="section-users__wrap">
				<div class="card" v-for="user in userStore.usersList" :key="user.id">
					<div class="card__img">
						<img :src="user.photo" alt="">
					</div>
					<h4 class="card__name" @mouseenter="enter($event, user.name)" @mouseleave="leave">{{ user.name }}</h4>
					<p class="card__position" @mouseenter="enter($event, user.position)" @mouseleave="leave">{{ user.position }}
					</p>
					<a href="#" class="card__email" @mouseenter="enter($event, user.email)" @mouseleave="leave">{{ user.email
					}}</a>
					<a href="#" class="card__phone" @mouseenter="enter($event, filterPhone(user.phone))" @mouseleave="leave">{{
							filterPhone(user.phone)
					}}</a>
				</div>
			</div>

			<BaseLoader class="section-users__loader" v-if="userStore.loading" />

			<BaseButton v-if="!userStore.allUserLoaded" class="section-users__more" text="Show more" @click="loadMore" />
		</div>
	</section>

	<Teleport to="body">
		<transition name="tooltip">
			<div v-if="tooltipSetting.show" class="tooltip"
				:style="{ top: `${tooltipSetting.top}px`, left: `${tooltipSetting.left}px` }">
				{{ tooltipSetting.title }}
			</div>
		</transition>
	</Teleport>
</template>

<style lang="scss">
.section-users {
	margin: 140px 0;
	text-align: center;

	&__title {
		margin-bottom: 50px;
	}

	&__wrap {
		display: grid;
		grid-template-columns: repeat(3, minmax(100px, 1fr));
		gap: 29px;

		@media (max-width: 991px) {
			grid-template-columns: repeat(2, minmax(100px, 1fr));
			gap: 16px;
		}

		@media (max-width: 576px) {
			grid-template-columns: minmax(100px, 1fr);
			gap: 20px;
		}
	}

	&__more {
		margin-top: 50px;
	}

	&__loader {
		margin-top: 50px;
	}
}

.card {
	padding: 20px;
	border-radius: 10px;
	background-color: #fff;

	&__img {
		display: block;
		width: 70px;
		height: 70px;
		margin: 0 auto 20px;
		border-radius: 50%;
		overflow: hidden;
		background: center / cover no-repeat url('~@/assets/photo-placeholder.png');
	}

	&__name {
		margin-bottom: 20px;
	}

	&__name,
	&__position,
	&__email,
	&__phone {
		display: block;
		width: max-content;
		max-width: 100%;
		margin-left: auto;
		margin-right: auto;
		font-size: 16px;
		line-height: 26px;
		font-weight: 400;
		color: $black;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		text-decoration: none;
	}
}

.tooltip-enter-active,
.tooltip-leave-active {
	transition-delay: 2s;
	transition: opacity 0.5s ease, transform 0.2s ease;
}

.tooltip-enter-from,
.tooltip-leave-to {
	opacity: 0;
	transform: translateY(20px);
}
</style>