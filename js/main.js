var body = document.querySelector("body");
		var containers = document.querySelectorAll(".products");
		var currentPage = 0;

		function showPage(){
		var product = [];
		
		function getElementFromTemplate(data) {
			var template = document.querySelector("#product-template");
			var element = template.content.children[0].cloneNode(true);

			element.querySelector(".product__pic img").src = data.preview;
			element.querySelector(".product__pic img").alt = "картинка" + " " + data.name;
			element.querySelector(".product__more").textContent = data.name;
			element.querySelector(".product__price").textContent = data.price + " " + "₽";
			element.setAttribute("data-category", data.category);
			element.querySelector(".product__pic").setAttribute("data-photos", data.photos);
			element.querySelector(".product__pic").setAttribute("data-description", data.description);
			element.querySelector(".product__pic").setAttribute("data-name", data.name);
			element.querySelector(".product__pic").setAttribute("data-price", data.price);

		    return element;

		}

		function renderProduct(product, pageNumber) {

			product.forEach(function(product) {
				var element = getElementFromTemplate(product);

				for(var i = 0; i < containers.length; i++){

					if(containers[i].id == element.dataset.category){
						containers[i].appendChild(element);
					}

				}	

			});
		}

			var xhr = new XMLHttpRequest();
			xhr.open('GET', 'data/data.json', false);
			xhr.onload = function(evt) {
				var rawData = evt.target.response;
				var loadedProduct = JSON.parse(rawData);
				
				renderProduct(loadedProduct, currentPage);
			};

			xhr.send();

		}

		showPage();

		var productForClick = document.querySelectorAll(".product__more");

		for (var i = 0; i < productForClick.length; i++){	

			if(productForClick[i].previousElementSibling.dataset.photos.split(',').length > 1){
				//создание переключателя картики превью
				var toggle = document.createElement("div");
				toggle.className = "toggle";
				productForClick[i].previousElementSibling.appendChild(toggle);

				var toggleLeft = document.createElement("div");
				toggleLeft.className = "toggle__left";
				toggleLeft.innerHTML = '<i class="fa fa-angle-left" aria-hidden="true"></i>';
				toggle.appendChild(toggleLeft);

				var toggleRight = document.createElement("div");
				toggleRight.className = "toggle__right";
				toggleRight.innerHTML = '<i class="fa fa-angle-right" aria-hidden="true"></i>';
				toggle.appendChild(toggleRight);
			}

			productForClick[i].addEventListener('click', function() {

				//Оболочка высплывающего окна
				var popUpCard = document.createElement("div");
				popUpCard.className = "popup-card";
				body.appendChild(popUpCard);

				//Всплывающте окно
				var popUpCardCard = document.createElement("div");
				popUpCardCard.className = "popup-card__card";
				popUpCard.appendChild(popUpCardCard);

				//Кнопка закрыть попап
				var popUpClose = document.createElement("div");
				popUpClose.className = "popup-card__close";
				popUpCardCard.appendChild(popUpClose);

				popUpClose.addEventListener('click', function() {
					body.removeChild(popUpCard)
				});

				//Оболочка для слайдера
				var popUpSlide = document.createElement("div");
				popUpSlide.className = "popup-card__slide";
				popUpCardCard.appendChild(popUpSlide);


				//Преобразование списка картинок в массив
				var photos = this.previousElementSibling.dataset.photos;
				var photosArray = photos.split(',');

				//Информация из JSON в DataSet помещенная в переменные для вставки в карточку
				var name = this.previousElementSibling.dataset.name;
				var description = this.previousElementSibling.dataset.description;
				var price = this.previousElementSibling.dataset.price;


				//Изображения для слайдера
				var popUpSlideImg = document.createElement("img");
				popUpSlideImg.className = "popup-card__img";
				popUpSlideImg.src = "img/" + photosArray[0];
				popUpSlide.appendChild(popUpSlideImg);

				//Создание области переключателей для слайдера
				var popUpSlideToggle = document.createElement("div");
				popUpSlideToggle.className = "popup-card__toggle";
				popUpSlide.appendChild(popUpSlideToggle);

				//Создание самих переключателей
				photosArray.forEach(function(item, i, photosArray) {
					var popUpSlideTogglePoint = document.createElement("div");
					popUpSlideTogglePoint.className = "popup-card__point";
					popUpSlideToggle.appendChild(popUpSlideTogglePoint);
				});

				//Блок логики переключения картинок в карточке
				var popUpSlideTogglePointForClick = document.querySelectorAll(".popup-card__point");
				var popUpSlideImgForChange = document.querySelector(".popup-card__img");

					for (var i = 0; i < popUpSlideTogglePointForClick.length; i++){
						popUpSlideTogglePointForClick[0].classList.add("popup-card__point--active");
						popUpSlideTogglePointForClick[i].addEventListener('click', function() {	
						
							for (var y = 0; y < popUpSlideTogglePointForClick.length; y++){
								popUpSlideTogglePointForClick[y].classList.remove("popup-card__point--active");
							}	

							this.classList.add("popup-card__point--active");
							popUpSlideImgForChange.src = "img/" + photosArray[$(this).index()];
						});
					}

				//Создание описательной части карточки
				var popUpRight = document.createElement("div");
				popUpRight.className = "popup-card__right";
				popUpCardCard.appendChild(popUpRight);

				//Создание название товара в карточке
				var popUpName = document.createElement("div");
				popUpName.className = "popup-card__name";
				popUpName.innerHTML = name;
				popUpRight.appendChild(popUpName);

				//Создание цены товара в карточке
				var popUpPrice = document.createElement("div");
				popUpPrice.className = "popup-card__price";
				popUpPrice.innerHTML = price + " " + "р.";
				popUpRight.appendChild(popUpPrice);

				//Создание формы в карточке
				var popUpForm = document.createElement("form");
				popUpForm.className = "popup-card__form";
				popUpForm.action = "form.php";
				popUpForm.method = "post";
				popUpRight.appendChild(popUpForm);

				//Создание поля имя в карточке
				var popUpInputName = document.createElement("input");
				popUpInputName.className = "popup-card__field";
				popUpInputName.type = "text";
				popUpInputName.placeholder = "Имя";
				popUpInputName.name = "contact_name";
				popUpForm.appendChild(popUpInputName);

				//Создание поял имя в карточке
				var popUpInputTel = document.createElement("input");
				popUpInputTel.className = "popup-card__field";
				popUpInputTel.type = "text";
				popUpInputTel.placeholder = "Телефон";
				popUpInputTel.name = "contact_tel";
				popUpForm.appendChild(popUpInputTel);

				//Создание скрытого поля в карточке, для отправке названия товара
				var popUpInputHidden = document.createElement("input");
				popUpInputHidden.type = "hidden";
				popUpInputHidden.name = "product";
				popUpInputHidden.value = name;
				popUpForm.appendChild(popUpInputHidden);

				//Создание оболочки для кнопка отправки формы карточке
				var popUpInputButtonWrapper = document.createElement("div");
				popUpInputButtonWrapper.className = "popup-card__button-wrapper";
				popUpForm.appendChild(popUpInputButtonWrapper);

				//Создание кнопки отправки формы карточке
				var popUpInputButton = document.createElement("input");
				popUpInputButton.className = "popup-card__button wave";
				popUpInputButton.type = "submit";
				popUpInputButton.value = "Заказать";
				popUpInputButtonWrapper.appendChild(popUpInputButton);

				//Создание описание товара в карточке
				var popUpDescription = document.createElement("div");
				popUpDescription.className = "popup-card__description";
				popUpDescription.innerHTML = description;
				popUpCardCard.appendChild(popUpDescription);
				var parent, ink, d, x, y;
				$(".wave").mousedown(function(e){
					parent = $(this).parent();
					if(parent.find(".ink").length == 0)
						parent.prepend("<span class='ink'></span>");				        
						ink = parent.find(".ink");		   
						ink.removeClass("animate");    
						if(!ink.height() && !ink.width())
							{
							    d = Math.max(parent.outerWidth(), parent.outerHeight());
							    ink.css({height: d, width: d});
						}
					x = e.pageX - parent.offset().left - ink.width()/2;
					y = e.pageY - parent.offset().top - ink.height()/2;	     
					ink.css({top: y+'px', left: x+'px'}).addClass("animate");
				});
			});
		}


		//переключение картинки превью
		var indexSrc = 0;
		var toggleRightForClick = $(".toggle__right");
		var toggleleftForClick = $(".toggle__left");

		toggleRightForClick.click(function (){
			indexSrc++;
			var srcImg = $(this).parent().parent().attr('data-photos');
			var srcImgArray = srcImg.split(',');
			if(indexSrc >= srcImgArray.length){
				indexSrc = 0;
			}
			var previewFotoChange = $(this).parent().prev().attr("src", "img/" + srcImgArray[indexSrc]);
		});

		toggleleftForClick.click(function (){
			indexSrc--;
			var srcImg = $(this).parent().parent().attr('data-photos');
			var srcImgArray = srcImg.split(',');
			if(indexSrc <= 0){
				indexSrc = srcImgArray.length - 1;
			}
		   var previewFotoChange = $(this).parent().prev().attr("src", "img/" + srcImgArray[indexSrc]);
		});