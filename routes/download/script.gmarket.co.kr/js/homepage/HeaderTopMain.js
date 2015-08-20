/*검색창*/
function HeaderTopSearch() { };

//Search box - 체크
HeaderTopSearch.CheckKeyword = function(){
    if (gmktMain_keystatus == 1) { return; }
    if (document.menusearchform.keyword.value == "") {
        window.alert("검색어를 입력해주세요.");
        document.menusearchform.keyword.focus();
        return false;
    }
    document.menusearchform.action = "http://search.gmarket.co.kr/search.aspx";
};

//Search box -  카테고리 리스트 선택
HeaderTopSearch.SelectCate = function(selBigCate, cateNm) {
    jQuery("#selectedCate").html(cateNm);
    jQuery("#gdlc").val(selBigCate);

    if (jQuery("#searchAllBigCate").css("display") == "none")
        jQuery("#categorySlice1").addClass("on");
    else
        jQuery("#categorySlice1").removeClass("on");

    if (jQuery("#allCate").css("display") == "none")
        jQuery("#allCate").css("display", "block");
    else
        jQuery("#allCate").css("display", "none");

    jQuery("#searchAllBigCate").css("display", "none");

    document.menusearchform.keyword.focus();
    document.menusearchform.keyword.value = "";
    jQuery("#keyword").removeClass("ad");

};

//Search box -  카테고리 선택시 css on
HeaderTopSearch.ChageCateCss = function () {
    for (i = 0; i < 18; i++) {
        jQuery("#srhHref" + i).removeClass("on");
    }
    jQuery("#srhHref" + i).addClass("on");
};

//Search box - 카테고리 선택 
HeaderTopSearch.SelectAllCate = function () {
    jQuery("#categorySlice1").removeClass("on");
    if (jQuery("#searchAllBigCate").css("display") == "none") {
        jQuery("#searchAllBigCate").css("display", "block");
        jQuery("#categorySlice1").addClass("on");
    } else {
        jQuery("#searchAllBigCate").css("display", "none");
    }

    if (document.menusearchform.gdlc.value == "")
        jQuery("#allCate").css("display", "none");
    else
        jQuery("#allCate").css("display", "block");
};

//Search box - 검색 URL 이동
HeaderTopSearch.BtnSearchBox = function () {
    if (jQuery("#keyword").val() == "") {
        jQuery("#keyword").focus();
        return false;
    }
    jQuery("#menusearchform").attr("action", "http://search.gmarket.co.kr/search.aspx");
};

//Search box - enter 이벤트
HeaderTopSearch.EventGo = function () {
    if (gmktMain_keystatus == 2)
        HeaderTopSearch.BtnSearchBox();
    else
        document.location.href = document.menusearchform.action;
};


/*카테고리 전체 보기*/
function HeaderTopCateLayer() { };
var ALL_CATE_CK = 0;
HeaderTopCateLayer.GetAllCategory = function () {

    jQuery("#displayAllCategory a").toggleClass("selected");

    if (ALL_CATE_CK == 0) {
        jQuery.getScript(url_script + "js/homepage/HeaderTopCategorysMain.js");
        ALL_CATE_CK = 1;
    }
    else {

        if (jQuery("#displayAllCategory a").hasClass("selected") == true)
            jQuery("#allCateCont").show();        
        else            
            jQuery('#allCateCont').hide();        
    }
};

HeaderTopCateLayer.Close = function () {
    jQuery("#displayAllCategory a").toggleClass("selected");
    jQuery('#allCateCont').hide();
};

