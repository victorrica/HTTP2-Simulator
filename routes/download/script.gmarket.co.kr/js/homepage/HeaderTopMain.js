/*�˻�â*/
function HeaderTopSearch() { };

//Search box - üũ
HeaderTopSearch.CheckKeyword = function(){
    if (gmktMain_keystatus == 1) { return; }
    if (document.menusearchform.keyword.value == "") {
        window.alert("�˻�� �Է����ּ���.");
        document.menusearchform.keyword.focus();
        return false;
    }
    document.menusearchform.action = "http://search.gmarket.co.kr/search.aspx";
};

//Search box -  ī�װ� ����Ʈ ����
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

//Search box -  ī�װ� ���ý� css on
HeaderTopSearch.ChageCateCss = function () {
    for (i = 0; i < 18; i++) {
        jQuery("#srhHref" + i).removeClass("on");
    }
    jQuery("#srhHref" + i).addClass("on");
};

//Search box - ī�װ� ���� 
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

//Search box - �˻� URL �̵�
HeaderTopSearch.BtnSearchBox = function () {
    if (jQuery("#keyword").val() == "") {
        jQuery("#keyword").focus();
        return false;
    }
    jQuery("#menusearchform").attr("action", "http://search.gmarket.co.kr/search.aspx");
};

//Search box - enter �̺�Ʈ
HeaderTopSearch.EventGo = function () {
    if (gmktMain_keystatus == 2)
        HeaderTopSearch.BtnSearchBox();
    else
        document.location.href = document.menusearchform.action;
};


/*ī�װ� ��ü ����*/
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

