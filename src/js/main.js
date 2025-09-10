import '../scss/style.scss'

document.addEventListener('DOMContentLoaded', () => {
	const burgers = document.querySelectorAll('.header__burger')
	const body = document.body

	if (burgers.length > 0) {
		burgers.forEach(burger => {
			burger.addEventListener('click', () => {
				body.classList.toggle('menu-open')
			})
		})
		document.addEventListener('keydown', e => {
			if (e.key === 'Escape' && body.classList.contains('menu-open')) {
				body.classList.remove('menu-open')
			}
		})
	}

	const header = document.querySelector('.header__wrapper')
	if (header) {
		let lastScrollY = 0
		let ticking = false

		function onScroll() {
			const currentScroll = window.scrollY

			if (!ticking) {
				window.requestAnimationFrame(() => {
					if (currentScroll > 95) {
						header.classList.add('header-scroll')
					} else {
						header.classList.remove('header-scroll')
					}
					if (currentScroll < 290) {
						header.classList.remove('header-show')
					}

					if (currentScroll > lastScrollY) {
						header.classList.remove('header-show')
					}

					lastScrollY = currentScroll
					ticking = false
				})

				ticking = true
			}
		}

		let scrollTimeout
		window.addEventListener('scroll', () => {
			onScroll()

			clearTimeout(scrollTimeout)
			scrollTimeout = setTimeout(() => {
				if (window.scrollY >= 290) {
					header.classList.add('header-show')
				}
			}, 150)
		})
	}
})
