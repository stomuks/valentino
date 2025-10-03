import '../scss/style.scss'

document.addEventListener('DOMContentLoaded', () => {
	const body = document.body
	const header = document.querySelector('header')
	const headerName = document.querySelector('.header__name-hidden')
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

	if (headerName) {
		headerName.classList.remove('header__name-hidden')
		headerName.classList.add('header__name')
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

		if (window.innerWidth <= 766) {
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

	const loadMoreButton = document.querySelector('.js-load-more-publications')
	if (loadMoreButton) {
		loadMoreButton.addEventListener('click', function (e) {
			e.preventDefault()

			const button = this
			const grid = document.querySelector('.js-publications-grid')
			let offset = parseInt(button.dataset.offset, 10)
			const postId = button.dataset.postId
			const total = parseInt(button.dataset.total, 10)

			button.disabled = true
			button.textContent = 'Loading...'

			const formData = new FormData()
			formData.append('action', 'load_more_publications')
			formData.append('post_id', postId)
			formData.append('offset', offset)

			fetch(vd_ajax.ajax_url, {
				method: 'POST',
				body: formData
			})
				.then(response => response.text())
				.then(html => {
					if (html.trim()) {
						grid.insertAdjacentHTML('beforeend', html)
						const newOffset = offset + 6
						button.dataset.offset = newOffset

						if (newOffset >= total) {
							button.style.display = 'none'
						} else {
							button.disabled = false
							button.textContent = 'Show more'
						}
					} else {
						button.style.display = 'none'
					}
				})
				.catch(error => {
					console.error('Error:', error)
					button.disabled = false
					button.textContent = 'Show more'
				})
		})
	}
})
