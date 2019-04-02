var Home = {

    data: [],
    dataCategory: [],

    init() {
        let searchParams = {
            index: 'categories',
            type: 'category',
            from: 0,
            size: 100,
            body: {
                query: {
                    bool: {
                        "must": [
                            {
                                query_string: {
                                    default_field: "merchantId",
                                    query: Configuration.merchantId
                                }
                            },
                            {
                                "match": { "type": 32 }
                            },
                            {
                                match: { "languageId": $.cookie('kiddiCode_languageId') }
                            },
                        ]
                    }
                }
            }
        };
        client.search(searchParams, function (error, data) {
            var tempIDs = '';
            $.each(data.hits.hits, function (index, value) {
                Home.dataCategory.push(value._source);
                tempIDs += value._source.relationIds.join(' ') + ' ';
            });

            var searchArticles = {
                from: 0,
                size: 100,
                body: {
                    query: {
                        bool: {
                            "must": [
                                {
                                    query_string: {
                                        default_field: "categoryIds",
                                        query: tempIDs
                                    }
                                },
                                {
                                    match: { "languageId": $.cookie('kiddiCode_languageId') }
                                },
                            ]
                        }
                    }
                }
            };
            client.search(searchArticles, function (err, dataItem) {
                $.each(dataItem.hits.hits, function (index, value) {
                    Home.data.push(value._source);
                })
                var index = Home.dataCategory.find(e => e.displayOrder === 1);
                if (index != undefined) {
                    $.each(index.relationIds, function (rlsIndex, rlsValue) {
                        var item = Home.data.filter(e => e.categoryIds[0] === rlsValue);
                        $('#hp_banner').append(Home.buildBanner(item));
                    })
                }

                var index = Home.dataCategory.find(e => e.displayOrder === 2);
                if (index != undefined) {
                    $.each(index.relationIds, function (rlsIndex, rlsValue) {
                        var item = Home.data.filter(e => e.categoryIds[0] === rlsValue);
                        $.each(item, function (i, vl) {
                            $('#hp_classes').append(Home.buildClasses(i, vl));
                        })
                    })
                }

                var index = Home.dataCategory.find(e => e.displayOrder === 5);
                $('#hp_teacher h2').html(index.name);
                if (index != undefined) {
                    $.each(index.relationIds, function (rlsIndex, rlsValue) {
                        var item = Home.data.filter(e => e.categoryIds[0] === rlsValue);
                        $.each(item, function (i, vl) {
                            $('#hp_teacher_content').append(Home.buildTeacher(vl));
                        })
                    })
                }

                var index = Home.dataCategory.find(e => e.displayOrder === 6);
                var build = '';
                if (index != undefined) {
                    $.each(index.relationIds, function (rlsIndex, rlsValue) {
                        item = Home.data.filter(e => e.categoryIds[0] === rlsValue);
                        // console.log(item);
                        $.each(item, function (i, vl) {
                            build += '<li class="au-tab-list__item"><a href="#' + vl.subDescription + '" role = "tab" data - toggle="tab" aria-controls="' + vl.subDescription + '" aria - selected="true" > ' + vl.name + '</a ></li > ';
                            // $('.au-tab-list').html(build);
                            // $('.au-tab-content').html(Home.buildBenefit(rlsIndex, vl));

                        })
                    })
                }

            })

            var searchProducts = {
                from: 0,
                size: 100,
                body: {
                    query: {
                        bool: {
                            "must": [
                                {
                                    query_string: {
                                        default_field: "id",
                                        query: tempIDs
                                    }
                                },
                                {
                                    match: { "languageId": $.cookie('kiddiCode_languageId') }
                                },
                            ]
                        }
                    }
                }
            };
            client.search(searchProducts, function (err, dataProduct) {
                $.each(dataProduct.hits.hits, function (index, value) {
                    Home.data.push(value._source);
                })


                var index = Home.dataCategory.find(e => e.displayOrder === 3);
                if (index != undefined) {
                    $.each(index.relationIds, function (rlsIndex, rlsValue) {
                        var item = Home.data.find(e => e.id === rlsValue);
                        $('#hp_slogan').append(Home.buildSlogan(item));
                    })
                }

                var index = Home.dataCategory.find(e => e.displayOrder === 4);
                if (index != undefined) {
                    $.each(index.relationIds, function (rlsIndex, rlsValue) {
                        var item = Home.data.find(e => e.id === rlsValue);
                        // console.log(item);

                    })
                }
            })
        })
    },


    buildBanner(data) {
        var build = '';
        var imgUrl = '';
        $.each(data.images, function (index, value) {
            imgUrl = Configuration.imageRoot + value.path;
        })
        build += '<li class="rev-item rev-item-9" data-transition="fade">';
        build += '	<img class="rev-slidebg" src="' + imgUrl + '" alt="Master Slider 01" />';
        build += '	<div class="tp-caption tp-resizeme rev-img-1"';
        build += '		data-frames="[{&quot;delay&quot;:500,&quot;speed&quot;:1000,&quot;frame&quot;:&quot;0&quot;,&quot;from&quot;:&quot;y:50px;opacity:0;&quot;,&quot;to&quot;:&quot;o:1;&quot;,&quot;ease&quot;:&quot;Power3.easeOut&quot;},{&quot;delay&quot;:&quot;wait&quot;,&quot;speed&quot;:300,&quot;frame&quot;:&quot;999&quot;,&quot;to&quot;:&quot;opacity:0;&quot;,&quot;ease&quot;:&quot;Power3.easeInOut&quot;}]"';
        build += '		data-x="[right]" data-y="[bottom]" data-hoffset="[0, 0, -60, 0, 0]"';
        build += '		data-voffset="[-140, -140, -140, -140, -140]" data-width="["auto"]"';
        build += '		data-height="[&quot;auto&quot;]"';
        build += '		data-whitespace="[nowrap, nowrap, nowrap, nowrap, nowrap]">';
        build += '		<img src="images/slide-item-13.png" alt="Slide Img" />';
        build += '	</div>';
        build += '	<div class="tp-caption tp-resizeme rev-text-8"';
        build += '		data-frames="[{&quot;delay&quot;:700,&quot;speed&quot;:1000,&quot;frame&quot;:&quot;0&quot;,&quot;from&quot;:&quot;y:50px;opacity:0;&quot;,&quot;to&quot;:&quot;o:1;&quot;,&quot;ease&quot;:&quot;Power3.easeOut&quot;},{&quot;delay&quot;:&quot;wait&quot;,&quot;speed&quot;:300,&quot;frame&quot;:&quot;999&quot;,&quot;to&quot;:&quot;opacity:0;&quot;,&quot;ease&quot;:&quot;Power3.easeInOut&quot;}]"';
        build += '		data-x="[left,left,center,center,center]" data-y="[center]"';
        build += '		data-hoffset="[45, 45, 1, 1, 1]" data-voffset="[-110, -110, -100, -100, -100]"';
        build += '		data-paddingleft="[0, 0, 0, 0, 15]" data-paddingright="[0, 0, 0, 0, 15]"';
        build += '		data-width="[365, 365, 570, 510, 576]" data-height="[&quot;auto&quot;]"';
        build += '		data-whitespace="[normal, normal, normal, normal, normal]" data-color="#333"';
        build += '		data-fontweight="400" data-fontsize="[40, 40, 45, 45, 40]"';
        build += '		data-textalign="[left,left,center,center,center]" data-lineheight="60"';
        build += '		data-responsive_offset="on">Learn smart teaching method</div>';
        build += '	<div class="tp-caption tp-resizeme rev-img-1"';
        build += '		data-frames="[{&quot;delay&quot;:1600,&quot;speed&quot;:600,&quot;frame&quot;:&quot;0&quot;,&quot;from&quot;:&quot;x:-200px;skX:85px;opacity:0;&quot;,&quot;to&quot;:&quot;o:1;&quot;,&quot;ease&quot;:&quot;Power3.easeInOut&quot;},{&quot;delay&quot;:&quot;wait&quot;,&quot;speed&quot;:800,&quot;frame&quot;:&quot;999&quot;,&quot;to&quot;:&quot;auto:auto;&quot;,&quot;ease&quot;:&quot;Power3.easeInOut&quot;}]"';
        build += '		data-x="[left,left,center,center,center]" data-y="[center]"';
        build += '		data-hoffset="[45, 45, 1, 1, 1]" data-voffset="[-30, -30, -25, -25, -40]"';
        build += '		data-width="["auto"]" data-height="[&quot;auto&quot;]">';
        build += '		<img src="images/icon/line-black.png" alt="Slide Img 2" />';
        build += '	</div>';
        build += '	<div class="tp-caption tp-resizeme"';
        build += '		data-frames="[{&quot;delay&quot;:950,&quot;speed&quot;:1000,&quot;frame&quot;:&quot;0&quot;,&quot;from&quot;:&quot;y:50px;opacity:0;&quot;,&quot;to&quot;:&quot;o:1;&quot;,&quot;ease&quot;:&quot;Power3.easeOut&quot;},{&quot;delay&quot;:&quot;wait&quot;,&quot;speed&quot;:300,&quot;frame&quot;:&quot;999&quot;,&quot;to&quot;:&quot;opacity:0;&quot;,&quot;ease&quot;:&quot;Power3.easeInOut&quot;}]"';
        build += '		data-x="[left]" data-y="[center]" data-hoffset="[45, 45, 0, 1, 0]"';
        build += '		data-voffset="[60, 60, 70, 70, 70]" data-paddingleft="[0, 0, 0, 0, 15]"';
        build += '		data-paddingright="[0, 0, 0, 0, 15]" data-width="[576, 576, 570, 480, 480]"';
        build += '		data-height="[&quot;auto&quot;]"';
        build += '		data-whitespace="[normal, normal, normal, normal, normal]" data-color="#666"';
        build += '		data-fontweight="400" data-fontsize="[15, 15, 20, 25, 25]"';
        build += '		data-textalign="[left,left,center,center,center]" data-responsive_offset="on">But I must';
        build += '		explain to you how all this mistaken idea of denouncing pleasure and praising pain was';
        build += '		born and I will give you a complete account of the system, and expound the actual';
        build += '		teachings.</div>';
        build += '	<a class="tp-caption tp-resizeme" href="#" target="_self"';
        build += '		data-frames="[{&quot;delay&quot;:1600,&quot;speed&quot;:1000,&quot;frame&quot;:&quot;0&quot;,&quot;from&quot;:&quot;y:50px;opacity:0;&quot;,&quot;to&quot;:&quot;o:1;&quot;,&quot;ease&quot;:&quot;Power3.easeOut&quot;},{&quot;delay&quot;:&quot;wait&quot;,&quot;speed&quot;:800,&quot;frame&quot;:&quot;999&quot;,&quot;to&quot;:&quot;opacity:0;&quot;,&quot;ease&quot;:&quot;Power3.easeInOut&quot;}]"';
        build += '		data-x="[left,left,center,center,center]" data-y="[center,center,center,center,center]"';
        build += '		data-hoffset="[40, 45, -20, -20, -20]" data-voffset="[183, 173, 210, 250, 250]"';
        build += '		data-width="["auto"]" data-height="[&quot;auto&quot;]" data-responsive_offset="on"';
        build += '		data-responsive="off" data-whitespace="[nowrap, nowrap, nowrap, nowrap, nowrap]">';
        build += '		<span class="rev-btn-3">learn more';
        build += '			<span class="arrow" data-paddingleft="10">';
        build += '				<i class="zmdi zmdi-chevron-right"></i>';
        build += '				<i class="zmdi zmdi-chevron-right"></i>';
        build += '			</span>';
        build += '		</span>';
        build += '	</a>';
        build += '</li>';
        return build;
    },

    buildClasses(index, data) {
        var build = "";
        var imgUrl = '';
        $.each(data.images, function (index, value) {
            imgUrl = Configuration.imageRoot + value.path + '?mode=crop&width=81&height=76';
        })
        build += '<div class="col-md-6 col-lg-4">';
        build += '	<div class="box box-intro ' + (index === 0 ? 'blue' : (index === 1 ? 'pink' : 'violet')) + '">';
        build += '		<div class="box__head">';
        build += '			<div class="box__icon au-icon-3">';
        build += '				<img src="' + imgUrl + '" alt="Icon 1">';
        build += '			</div>';
        build += '		</div>';
        build += '		<div class="box__body">';
        build += '			<h3 class="title title--md title--white">';
        build += '				<a href="#">' + data.name + '</a>';
        build += '			</h3>';
        build += '			<p class="m-b-35 text-ellipsis line-5">' + data.subDescription + '</p>';
        // build += '			<a class="link-learn-more link-learn-more--white" href="#">learn more';
        // build += '				<i class="zmdi zmdi-chevron-right"></i>';
        // build += '				<i class="zmdi zmdi-chevron-right"></i>';
        // build += '			</a>';
        build += '		</div>';
        build += '	</div>';
        build += '</div>';
        return build;
    },

    buildSlogan(data) {
        var build = '';
        var imgUrl = '';

        $.each(data.images, function (index, value) {
            imgUrl = Configuration.imageRoot + value.path + '?mode=crop&width=1920height=600';
        })

        build += '<section class="section p-t-95 p-b-100 bg-class" style="background : url(' + imgUrl + ') center center/cover no-repeat">';
        build += '	<div class="container">';
        build += '		<div class="row">';
        build += '			<div class="col-md-6 offset-md-6">';
        build += '				<div class="p-l-70 p-md-l-0">';
        build += '					<div';
        build += '						class="section-heading section-heading-1 section-heading-1--small text-left m-b-35">';
        build += '						<h2 class="section-heading__title">' + data.name + '</h2>';
        build += '						<div class="section-heading__line">';
        build += '							<img src="images/icon/line-blue-small.png" alt="Line">';
        build += '						</div>';
        build += '					</div>';
        build += '					<p class="m-b-15">' + data.description + '</p>';
        build += '					<a class="au-btn--blue au-btn" href="#">learn more';
        build += '						<i class="zmdi zmdi-chevron-right"></i>';
        build += '						<i class="zmdi zmdi-chevron-right"></i>';
        build += '					</a>';
        build += '				</div>';
        build += '			</div>';
        build += '		</div>';
        build += '	</div>';
        build += '</section>';
        return build;
    },

    buildTeacher(data) {
        var build = '';
        build += '<div class="col-lg-6">';
        build += '	<div class="media media-teacher-2">';
        build += '		<div class="media__img">';
        build += '			<a href="teacher-single.html">';
        build += '				<img src="images/teacher-06.jpg" alt="' + data.name + '" />';
        build += '			</a>';
        build += '		</div>';
        build += '		<div class="media__body">';
        build += '			<h4 class="media__title title title--sm title--black">';
        build += '				<a href="teacher-single.html">' + data.name + '</a>';
        build += '			</h4>';
        build += '			<span class="media__desc">' + data.subDescription + '</span>';
        build += '			<p class="media__text">' + data.description + '</p>';
        // build += '			<div class="media__tool">';
        // build += '				<a class="au-icon au-icon-2" href="#">';
        // build += '					<i class="zmdi zmdi-facebook-box"></i>';
        // build += '				</a>';
        // build += '				<a class="au-icon au-icon-2" href="#">';
        // build += '					<i class="zmdi zmdi-twitter"></i>';
        // build += '				</a>';
        // build += '				<a class="au-icon au-icon-2" href="#">';
        // build += '					<i class="zmdi zmdi-instagram"></i>';
        // build += '				</a>';
        // build += '			</div>';
        build += '		</div>';
        build += '	</div>';
        build += '</div>';
        return build;
    },

    buildBenefit(index, data) {
        var build = '';
        build += '<div class="tab-pane au-tab-pane fade ' + index === 1 ? 'show active' : '' + '" role="tabpanel" id="' + data.subDescription + '">';
        build += '	<div class="au-tab-pane-inner">';
        build += '		<div class="au-tab-pane__text">';
        build += '			<h3 class="title title--lg title--black">' + data.name + '</h3>';
        // build += '			<p class="m-b-15"</p>';
        build += '			<p>' + data.description + '</p>';
        build += '			<a class="link-learn-more" href="#">learn more';
        build += '				<i class="zmdi zmdi-chevron-right"></i>';
        build += '				<i class="zmdi zmdi-chevron-right"></i>';
        build += '			</a>';
        build += '		</div>';
        build += '		<div class="au-tab-pane__img">';
        build += '			<div class="img-radius img--w160 m-r-30 m-md-r-0">';
        build += '				<img src="images/offer-01.jpg" alt="Offer 1">';
        build += '			</div>';
        build += '			<div class="img-radius img--w220">';
        build += '				<img src="images/offer-02.jpg" alt="Offer 2">';
        build += '			</div>';
        build += '		</div>';
        build += '	</div>';
        build += '</div>';
        return build;
    }

}