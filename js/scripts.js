$(() => {
	// Основной слайдер на главной
	if ($('.main_slider > .swiper-container').length) {
		new Swiper('.main_slider > .swiper-container', {
			loop: true,
			speed: 750,
			watchSlidesVisibility: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 0,
			slidesPerView: 1,
			autoplay: {
				delay: 3000
			},
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
				bulletActiveClass: 'active'
			}
		})
	}


	// Сертификаты
	if ($('.certs .swiper-container').length) {
		new Swiper('.certs .swiper-container', {
			loop: false,
			speed: 500,
			watchSlidesVisibility: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			breakpoints: {
				0: {
					spaceBetween: 20,
					slidesPerView: 1
				},
				480: {
					spaceBetween: 16,
					slidesPerView: 2
				},
				768: {
					spaceBetween: 20,
					slidesPerView: 3
				},
				1024: {
					spaceBetween: 20,
					slidesPerView: 4
				},
				1218: {
					spaceBetween: 30,
					slidesPerView: 4
				}
			}
		})
	}


	// Промо товары
	if ($('.products.promo_products .swiper-container').length) {
		new Swiper('.products.promo_products .swiper-container', {
			effect: 'fade',
			fadeEffect: {
				crossFade: true
			},
			loop: true,
			speed: 500,
			watchSlidesVisibility: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 0,
			slidesPerView: 1,
			autoplay: {
				delay: 3000
			},
			on: {
				init: swiper => {
					setTimeout(() => {
						productHeight($(swiper.$el), $(swiper.$el).find('.product').length)
					})
				},
				resize: swiper => {
					setTimeout(() => {
						productHeight($(swiper.$el), $(swiper.$el).find('.product').length)
					})
				}
			}
		})
	}


	// Товары
	if ($('.products:not(.promo_products) .swiper-container').length) {
		new Swiper('.products:not(.promo_products) .swiper-container', {
			loop: false,
			speed: 500,
			watchSlidesVisibility: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			breakpoints: {
				0: {
					spaceBetween: 20,
					slidesPerView: 1
				},
				480: {
					spaceBetween: 16,
					slidesPerView: 2
				},
				768: {
					spaceBetween: 20,
					slidesPerView: 3
				},
				1218: {
					spaceBetween: 30,
					slidesPerView: 3
				}
			},
			on: {
				init: swiper => {
					setTimeout(() => {
						productHeight($(swiper.$el), $(swiper.$el).find('.product').length)
					})
				},
				resize: swiper => {
					setTimeout(() => {
						productHeight($(swiper.$el), $(swiper.$el).find('.product').length)
					})
				}
			}
		})
	}


	// Страница товара
	if ($('.product_info .images').length) {
		const productSlider = new Swiper('.product_info .big .swiper-container', {
			loop: false,
			speed: 500,
			watchSlidesVisibility: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 0,
			slidesPerView: 1,
			on: {
				slideChange: swiper => {
					setTimeout(() => {
						$('.product_info .images .thumbs button').removeClass('active')
						$('.product_info .images .thumbs button').eq(swiper.activeIndex).addClass('active')
					})
				}
			}
		})

		$('.product_info .images .thumbs button').click(function (e) {
			e.preventDefault()

			productSlider.slideTo($(this).data('slide-index'), 500)
		})
	}


	// Боковая колонка - Категории товаров
	$('aside .categories .category .arrow').click(function (e) {
		e.preventDefault()

		let category = $(this).closest('.category')

		!category.hasClass('active')
			? category.toggleClass('active').next().slideDown(300)
			: category.toggleClass('active').next().slideUp(200)
	})


	// Отправка форм
	$('.feedback form').submit(function (e) {
		e.preventDefault()

		$('.feedback .seccess_message').fadeIn(300)
	})
})



$(window).on('load', () => {
	// Выравнивание элементов в сетке
	$('.products .row').each(function () {
		productHeight($(this), parseInt($(this).css('--products_count')))
	})


	// Статьи - сетка
	let articles = $('.articles .masonry'),
		articlesGutter = parseInt(articles.css('--articles_gutter'))

	masonry = articles.masonry({
		percentPosition: true,
		gutter: articlesGutter,
		itemSelector: '.article',
		columnWidth: articles.find('.article').width()
	})


	// Фикс. шапка
	headerInit = true,
		headerHeight = $('header').outerHeight()

	$('header').wrap('<div class="header_wrap"></div>')
	$('.header_wrap').height(headerHeight)

	headerInit && $(window).scrollTop() > headerHeight
		? $('header').addClass('fixed')
		: $('header').removeClass('fixed')
})



$(window).resize(() => {
	// Выравнивание элементов в сетке
	$('.products .row').each(function () {
		productHeight($(this), parseInt($(this).css('--products_count')))
	})


	// Фикс. шапка
	headerInit = false
	$('.header_wrap').height('auto')

	setTimeout(() => {
		headerInit = true
		headerHeight = $('header').outerHeight()

		$('.header_wrap').height(headerHeight)

		headerInit && $(window).scrollTop() > headerHeight
			? $('header').addClass('fixed')
			: $('header').removeClass('fixed')
	}, 100)
})



$(window).scroll(() => {
	// Фикс. шапка
	typeof headerInit !== 'undefined' && headerInit && $(window).scrollTop() > headerHeight
		? $('header').addClass('fixed')
		: $('header').removeClass('fixed')
})



// Выравнивание товаров
function productHeight(context, step) {
	let start = 0,
		finish = step,
		$products = context.find('.product')

	$products.find('.name').height('auto')

	$products.each(function () {
		setHeight($products.slice(start, finish).find('.name'))

		start = start + step
		finish = finish + step
	})
}