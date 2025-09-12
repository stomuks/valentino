import '../scss/style.scss'

document.addEventListener('DOMContentLoaded', () => {
	const body = document.body
	const header = document.querySelector('header')
	const menuBtnOpen = document.querySelector('.header__button-open')
	const scrollBarWidth =
		window.innerWidth - document.documentElement.clientWidth

	const menuOpen = () => {
		body.classList.add('menu-open')
		header.style.paddingRight = `${scrollBarWidth}px`
		body.style.marginRight = `${scrollBarWidth}px`
	}

	const menuClose = () => {
		body.classList.remove('menu-open')
		header.style.paddingRight = ''
		body.style.marginRight = ''
	}

	if (menuBtnOpen) {
		menuBtnOpen.addEventListener('click', () => {
			menuOpen()
		})

		body.addEventListener('click', e => {
			if (body.classList.contains('menu-open') && e.target !== menuBtnOpen) {
				menuClose()
			}
		})

		document.addEventListener('keydown', e => {
			if (e.key === 'Escape' && body.classList.contains('menu-open')) {
				menuClose()
			}
		})
	}

	window.addEventListener('scroll', () => {
		if (window.scrollY > 0) {
			header.classList.add('header-scroll')
		} else {
			header.classList.remove('header-scroll')
		}
	})

	const moveGrid = document.querySelector('.footer__grid')
	const moveBlock = document.querySelector('.footer__block')
	const moveTitle = moveBlock?.querySelector('.footer__title')
	const moveImg = moveGrid?.querySelector('.footer__img')

	function moveTitleFunc() {
		if (!moveGrid || !moveBlock || !moveTitle || !moveImg) return

		if (window.innerWidth <= 768) {
			if (moveTitle.parentElement === moveBlock) {
				moveGrid.insertBefore(moveTitle, moveImg)
			}
		} else {
			if (moveTitle.parentElement === moveGrid) {
				moveBlock.insertBefore(moveTitle, moveBlock.firstChild)
			}
		}
	}

	moveTitleFunc()
	window.addEventListener('resize', moveTitle)
})
