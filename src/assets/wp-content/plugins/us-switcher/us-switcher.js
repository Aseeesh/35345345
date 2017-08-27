(function($){

	var trackEvent = function(action, label, value){
		if (window.ga === undefined) return;
		window.ga('send', 'event', 'Switcher', action, label, value);
	};

	$.fn.wSwitcher = function(options){

		var defaultOptions = {},
			obj = $.extend(defaultOptions, options);

		return this.each(function(){
			var $switcher = $(this),
				$items = $switcher.find('.w-switcher-tabs'),
				$colorControl = $switcher.find('.w-switcher-tabs-item.for_color'),
				$demoControl = $switcher.find('.w-switcher-tabs-item.for_demos'),
				$testControl = $switcher.find('.w-switcher-tabs-item.for_test'),
				$buyControl = $switcher.find('.w-switcher-tabs-item.for_buy'),
				$colorSection = $switcher.find('.w-switcher-section.for_color'),
				$demoSection = $switcher.find('.w-switcher-section.for_demos'),
				$canvas = $('.l-canvas'),
				$layoutBtns = $switcher.find('.w-switcher-section.for_layout .w-switcher-section-item'),
				colorSwitched = false,
				options = $switcher.find('.w-switcher-json')[0].onclick();

			setTimeout(function(){ $switcher.addClass('loaded'); }, 1000);

			$items.on('hover', function(){
				if ( ! $switcher.hasClass('open')) trackEvent('hover');
			});

			$colorControl.click(function(){
				if ( ! $colorSection.hasClass('active')) {
					$demoControl.removeClass('active');
					$demoSection.removeClass('active');
					$colorControl.addClass('active');
					$colorSection.addClass('active');
					$switcher.addClass('open');
					trackEvent('open', 'colors');
				} else {
					$switcher.removeClass('open');
					$colorControl.removeClass('active');
					$colorSection.removeClass('active');
				}

			});

			$demoControl.click(function(){
				if ( ! $demoSection.hasClass('active')) {
					var $demoImages = $demoSection.find('img');
					$.each($demoImages, function(){
						var $img = $(this),
							dataSrc = $img.attr('data-src');
						if (dataSrc != undefined && dataSrc != '') {
							$img.attr('src', dataSrc);
							$img.attr('data-src', '');
						}
					});
					$colorControl.removeClass('active');
					$colorSection.removeClass('active');
					$demoControl.addClass('active');
					$demoSection.addClass('active');
					$switcher.addClass('open');
					trackEvent('open', 'demos');
				} else {
					$switcher.removeClass('open');
					$demoControl.removeClass('active');
					$demoSection.removeClass('active');
				}

			});

			$testControl.on('click', function(){
				trackEvent('click', 'testdrive');
			});

			$buyControl.on('click', function(){
				trackEvent('click', 'buy');
			});

			$switcher.find('.w-switcher-section.for_demos .w-switcher-section-item').on('click', function(){
				var $this = $(this);
				trackEvent('demoOpen', $this.find('.demo-title').html());
			});

			var curType = $canvas.usMod('type');
			$switcher.find('.layout_type_' + curType).addClass('active');

			$layoutBtns.click(function(){
				var $this = $(this);
				if ($this.hasClass('active')) return;
				var value = $this.attr('data-value');
				$layoutBtns.removeClass('active');
				$this.addClass('active');
				$canvas.usMod('type', value);
				// Redrawing all the Revolution Sliders
				if (window.revapi3 !== undefined && window.revapi3.revredraw !== undefined) {
					window.revapi3.revredraw();
				}
			});

			var $styleSchemes = {};
			var activeStyleScheme = null;

			var $colorBtns = $('.w-switcher-section.for_color .w-switcher-section-item');

			var showStyleScheme = function(id){
				if (id == activeStyleScheme ) return;

				if ( $styleSchemes[id] === undefined ) {
					$colorBtns.filter('[data-value="' + id + '"]').addClass('loading');
					$.ajax({
						type: 'POST',
						url: options.ajaxurl,
						data: {
							action: 'us_placeholder_ajax_stylescheme',
							scheme: id
						},
						success: function(html){
							var entities = [
								['apos', '\''],
								['amp', '&'],
								['lt', '<'],
								['gt', '>']
							];
							for (var i = 0, max = entities.length; i < max; ++i) {
								html = html.replace(new RegExp('&' + entities[i][0] + ';', 'g'), entities[i][1]);
							}

							$styleSchemes[id] = $(html);

							if ($styleSchemes[activeStyleScheme] !== undefined) $styleSchemes[activeStyleScheme].detach();

							$styleSchemes[id].appendTo($('head'));
							if ( ! colorSwitched) {
								$('#us-theme-options-css, #us-header-css').remove();
								colorSwitched = true;
							}

							$colorBtns.filter('[data-value="' + id + '"]').removeClass('loading');
							$colorBtns.removeClass('active').filter('[data-value="' + id + '"]').addClass('active');
							activeStyleScheme = id;
						}
					});
				} else {
					if ($styleSchemes[activeStyleScheme] !== undefined) $styleSchemes[activeStyleScheme].detach();

					$styleSchemes[id].appendTo($('head'));
					if ( ! colorSwitched) {
						$('#us-theme-options-css, #us-header-css').remove();
						colorSwitched = true;
					}

					$colorBtns.removeClass('active').filter('[data-value="' + id + '"]').addClass('active');
					activeStyleScheme = id;

				}

				trackEvent('changeColors', $colorBtns.filter('[data-value="' + id + '"]').find('.preview_text').html());

			};
			$colorBtns.click(function(){
				showStyleScheme($(this).data('value'));
			});

			trackEvent('init')
		});
	}
})(jQuery);

jQuery(document).ready(function(){
	jQuery('.w-switcher:first').wSwitcher();
});

