
	var total_cnt2 = 15; //������ ������� �� ���� : ������ ���ϸ� �׻� �ٲ���Ѵ�
	var view_cnt = 4; // ������ ����Ǵ� ����
	var adReportNums = "";
	var floatNewsEntity = new Array();
	var floatNewsEntityAdLog = new Array();

	gInitHelper().addHandler(function()
{
            
            floatNewsEntity[0] = "<a href=\"javascript:checkAdLink('218210537','http://item.gmarket.co.kr/detailview/Item.asp?goodscode=207365337&section=1','_blank','2','AdCheckForm');adReport('A18R0S218210537');GoSNAChannel('CHM1N011_1', '','stat');\"><img src=\"http://image.gmarket.co.kr/ti_image/2015/04/12/Front_upload20150412_172805_ik7.jpg\" alt=\"���̹���\"></a> <a href=\"javascript:checkAdLink('218210537','http://item.gmarket.co.kr/detailview/Item.asp?goodscode=207365337&section=1','_blank','2','AdCheckForm');GoSNAChannel('CHM1N011_1', '','stat');\" class='txt'>������ ������<br />�ѹڽ��� Ư��</a>"
	        floatNewsEntityAdLog[0] = "checkAdLink('218210537','','','1','AdCheckForm');"
	                
            floatNewsEntity[1] = "<a href=\"javascript:checkAdLink('218210543','http://item.gmarket.co.kr/detailview/Item.asp?goodscode=341978043&section=1','_blank','2','AdCheckForm');adReport('A18R0S218210543');GoSNAChannel('CHM1N011_2', '','stat');\"><img src=\"http://image.gmarket.co.kr/ti_image/2015/04/17/Front_upload20150417_171548_603.jpg\" alt=\"���̹���\"></a> <a href=\"javascript:checkAdLink('218210543','http://item.gmarket.co.kr/detailview/Item.asp?goodscode=341978043&section=1','_blank','2','AdCheckForm');GoSNAChannel('CHM1N011_2', '','stat');\" class='txt'>�������� ���<br />���̾�Ʈ GO</a>"
	        floatNewsEntityAdLog[1] = "checkAdLink('218210543','','','1','AdCheckForm');"
	                
            floatNewsEntity[2] = "<a href=\"javascript:checkAdLink('218210542','http://item.gmarket.co.kr/detailview/Item.asp?goodscode=205482035&section=1','_blank','2','AdCheckForm');adReport('A18R0S218210542');GoSNAChannel('CHM1N011_3', '','stat');\"><img src=\"http://image.gmarket.co.kr/ti_image/2015/06/05/Front_upload20150605_203410_liv.jpg\" alt=\"���̹���\"></a> <a href=\"javascript:checkAdLink('218210542','http://item.gmarket.co.kr/detailview/Item.asp?goodscode=205482035&section=1','_blank','2','AdCheckForm');GoSNAChannel('CHM1N011_3', '','stat');\" class='txt'>�������κ���<br />���ڿ�������</a>"
	        floatNewsEntityAdLog[2] = "checkAdLink('218210542','','','1','AdCheckForm');"
	                
            floatNewsEntity[3] = "<a href=\"javascript:checkAdLink('218210536','http://item.gmarket.co.kr/detailview/Item.asp?goodscode=216277460&section=1','_blank','2','AdCheckForm');adReport('A18R0S218210536');GoSNAChannel('CHM1N011_4', '','stat');\"><img src=\"http://image.gmarket.co.kr/ti_image/2015/08/07/Front_upload20150807_094022_ldp.jpg\" alt=\"���̹���\"></a> <a href=\"javascript:checkAdLink('218210536','http://item.gmarket.co.kr/detailview/Item.asp?goodscode=216277460&section=1','_blank','2','AdCheckForm');GoSNAChannel('CHM1N011_4', '','stat');\" class='txt'>���Ĺ�������<br />������ ���</a>"
	        floatNewsEntityAdLog[3] = "checkAdLink('218210536','','','1','AdCheckForm');"
	                
            floatNewsEntity[4] = "<a href=\"javascript:checkAdLink('218210545','http://item.gmarket.co.kr/detailview/Item.asp?goodscode=452830263&section=1','_blank','2','AdCheckForm');adReport('A18R0S218210545');GoSNAChannel('CHM1N011_5', '','stat');\"><img src=\"http://image.gmarket.co.kr/ti_image/2015/05/26/Front_upload20150526_161941_p1v.jpg\" alt=\"���̹���\"></a> <a href=\"javascript:checkAdLink('218210545','http://item.gmarket.co.kr/detailview/Item.asp?goodscode=452830263&section=1','_blank','2','AdCheckForm');GoSNAChannel('CHM1N011_5', '','stat');\" class='txt'>������������<br />��2��γа�</a>"
	        floatNewsEntityAdLog[4] = "checkAdLink('218210545','','','1','AdCheckForm');"
	                
            floatNewsEntity[5] = "<a href=\"javascript:checkAdLink('218210544','http://item.gmarket.co.kr/detailview/Item.asp?goodscode=129900007&section=1','_blank','2','AdCheckForm');adReport('A18R0S218210544');GoSNAChannel('CHM1N011_6', '','stat');\"><img src=\"http://image.gmarket.co.kr/ti_image/2015/07/13/Front_upload20150713_100018_tkh.jpg\" alt=\"���̹���\"></a> <a href=\"javascript:checkAdLink('218210544','http://item.gmarket.co.kr/detailview/Item.asp?goodscode=129900007&section=1','_blank','2','AdCheckForm');GoSNAChannel('CHM1N011_6', '','stat');\" class='txt'>�Ӵ����� ����<br />�Լҹ� ������</a>"
	        floatNewsEntityAdLog[5] = "checkAdLink('218210544','','','1','AdCheckForm');"
	                
            floatNewsEntity[6] = "<a href=\"javascript:checkAdLink('218210541','http://item.gmarket.co.kr/detailview/Item.asp?goodscode=501113681&section=1','_blank','2','AdCheckForm');adReport('A18R0S218210541');GoSNAChannel('CHM1N011_7', '','stat');\"><img src=\"http://image.gmarket.co.kr/ti_image/2015/06/30/Front_upload20150630_142012_g9i.jpg\" alt=\"���̹���\"></a> <a href=\"javascript:checkAdLink('218210541','http://item.gmarket.co.kr/detailview/Item.asp?goodscode=501113681&section=1','_blank','2','AdCheckForm');GoSNAChannel('CHM1N011_7', '','stat');\" class='txt'>���� �ٴϴ�<br />�ǰ� ������</a>"
	        floatNewsEntityAdLog[6] = "checkAdLink('218210541','','','1','AdCheckForm');"
	                
            floatNewsEntity[7] = "<a href=\"javascript:checkAdLink('218210540','http://item.gmarket.co.kr/detailview/Item.asp?goodscode=340105616&section=1','_blank','2','AdCheckForm');adReport('A18R0S218210540');GoSNAChannel('CHM1N011_8', '','stat');\"><img src=\"http://image.gmarket.co.kr/ti_image/2015/03/24/Front_upload20150324_101920_zry.jpg\" alt=\"���̹���\"></a> <a href=\"javascript:checkAdLink('218210540','http://item.gmarket.co.kr/detailview/Item.asp?goodscode=340105616&section=1','_blank','2','AdCheckForm');GoSNAChannel('CHM1N011_8', '','stat');\" class='txt'>������ ķ��<br />�ʼ�ǰ ����â</a>"
	        floatNewsEntityAdLog[7] = "checkAdLink('218210540','','','1','AdCheckForm');"
	                
            floatNewsEntity[8] = "<a href=\"javascript:checkAdLink('218210534','http://item.gmarket.co.kr/detailview/Item.asp?goodscode=691008100&section=1','_blank','2','AdCheckForm');adReport('A18R0S218210534');GoSNAChannel('CHM1N011_9', '','stat');\"><img src=\"http://image.gmarket.co.kr/ti_image/2015/07/02/Front_upload20150702_134031_mpc.jpg\" alt=\"���̹���\"></a> <a href=\"javascript:checkAdLink('218210534','http://item.gmarket.co.kr/detailview/Item.asp?goodscode=691008100&section=1','_blank','2','AdCheckForm');GoSNAChannel('CHM1N011_9', '','stat');\" class='txt'>���̺����<br />7����������</a>"
	        floatNewsEntityAdLog[8] = "checkAdLink('218210534','','','1','AdCheckForm');"
	                
            floatNewsEntity[9] = "<a href=\"javascript:checkAdLink('218210535','http://item.gmarket.co.kr/detailview/Item.asp?goodscode=192238316&section=1','_blank','2','AdCheckForm');adReport('A18R0S218210535');GoSNAChannel('CHM1N011_10', '','stat');\"><img src=\"http://image.gmarket.co.kr/ti_image/2015/05/28/Front_upload20150528_192412_8zy.jpg\" alt=\"���̹���\"></a> <a href=\"javascript:checkAdLink('218210535','http://item.gmarket.co.kr/detailview/Item.asp?goodscode=192238316&section=1','_blank','2','AdCheckForm');GoSNAChannel('CHM1N011_10', '','stat');\" class='txt'>�α� �Ż�ǰ<br />���� ����</a>"
	        floatNewsEntityAdLog[9] = "checkAdLink('218210535','','','1','AdCheckForm');"
	                
            floatNewsEntity[10] = "<a href=\"javascript:checkAdLink('218210539','http://item.gmarket.co.kr/detailview/Item.asp?goodscode=214762051&section=1','_blank','2','AdCheckForm');adReport('A18R0S218210539');GoSNAChannel('CHM1N011_11', '','stat');\"><img src=\"http://image.gmarket.co.kr/ti_image/2015/08/05/Front_upload20150805_150139_nh9.jpg\" alt=\"���̹���\"></a> <a href=\"javascript:checkAdLink('218210539','http://item.gmarket.co.kr/detailview/Item.asp?goodscode=214762051&section=1','_blank','2','AdCheckForm');GoSNAChannel('CHM1N011_11', '','stat');\" class='txt'>�����Ż�<br />6�� 3900��</a>"
	        floatNewsEntityAdLog[10] = "checkAdLink('218210539','','','1','AdCheckForm');"
	                
            floatNewsEntity[11] = "<a href=\"javascript:checkAdLink('218210547','http://item.gmarket.co.kr/detailview/Item.asp?goodscode=617467113&section=1','_blank','2','AdCheckForm');adReport('A18R0S218210547');GoSNAChannel('CHM1N011_12', '','stat');\"><img src=\"http://image.gmarket.co.kr/ti_image/2015/08/07/Front_upload20150807_120724_y36.jpg\" alt=\"���̹���\"></a> <a href=\"javascript:checkAdLink('218210547','http://item.gmarket.co.kr/detailview/Item.asp?goodscode=617467113&section=1','_blank','2','AdCheckForm');GoSNAChannel('CHM1N011_12', '','stat');\" class='txt'>�ٳ��ٳ� �ð�<br />�����ð� Ư��</a>"
	        floatNewsEntityAdLog[11] = "checkAdLink('218210547','','','1','AdCheckForm');"
	                
            floatNewsEntity[12] = "<a href=\"javascript:checkAdLink('218210533','http://item.gmarket.co.kr/detailview/Item.asp?goodscode=690353757&section=1','_blank','2','AdCheckForm');adReport('A18R0S218210533');GoSNAChannel('CHM1N011_13', '','stat');\"><img src=\"http://image.gmarket.co.kr/ti_image/2015/06/09/Front_upload20150609_103038_q7r.jpg\" alt=\"���̹���\"></a> <a href=\"javascript:checkAdLink('218210533','http://item.gmarket.co.kr/detailview/Item.asp?goodscode=690353757&section=1','_blank','2','AdCheckForm');GoSNAChannel('CHM1N011_13', '','stat');\" class='txt'>LG ���ô�<br />SKY ���ĵ�</a>"
	        floatNewsEntityAdLog[12] = "checkAdLink('218210533','','','1','AdCheckForm');"
	                
            floatNewsEntity[13] = "<a href=\"javascript:checkAdLink('218210546','http://item.gmarket.co.kr/detailview/Item.asp?goodscode=127767547&section=1','_blank','2','AdCheckForm');adReport('A18R0S218210546');GoSNAChannel('CHM1N011_14', '','stat');\"><img src=\"http://image.gmarket.co.kr/ti_image/2015/04/01/Front_upload20150401_140844_4es.jpg\" alt=\"���̹���\"></a> <a href=\"javascript:checkAdLink('218210546','http://item.gmarket.co.kr/detailview/Item.asp?goodscode=127767547&section=1','_blank','2','AdCheckForm');GoSNAChannel('CHM1N011_14', '','stat');\" class='txt'>����ȭ��ǰ<br />�����30mlx2</a>"
	        floatNewsEntityAdLog[13] = "checkAdLink('218210546','','','1','AdCheckForm');"
	                
            floatNewsEntity[14] = "<a href=\"javascript:checkAdLink('218210538','http://shop.gmarket.co.kr/challenge/neo_seller_collection/seller_collection_main.asp?cust_no=TAyMR38jODExNY05MDg0MzgyMTJ/Rw==&section=1','_blank','2','AdCheckForm');adReport('A18R0S218210538');GoSNAChannel('CHM1N011_15', '','stat');\"><img src=\"http://image.gmarket.co.kr/ti_image/2015/05/12/Front_upload20150512_183710_3ek.jpg\" alt=\"���̹���\"></a> <a href=\"javascript:checkAdLink('218210538','http://shop.gmarket.co.kr/challenge/neo_seller_collection/seller_collection_main.asp?cust_no=TAyMR38jODExNY05MDg0MzgyMTJ/Rw==&section=1','_blank','2','AdCheckForm');GoSNAChannel('CHM1N011_15', '','stat');\" class='txt'>��ǰ�� ����<br />5900�� ����</a>"
	        floatNewsEntityAdLog[14] = "checkAdLink('218210538','','','1','AdCheckForm');"
	    
	 floatNewsEntity[15] = "<a href=\"GoSNAChannel('CHM1N011_16', '','stat');\"><img src=\"\" alt=\"���̹���\"></a> <a href=\"GoSNAChannel('CHM1N011_16', '','stat');\" class='txt'><br /></a>"
	        floatNewsEntityAdLog[15] = "" 
	    
});
adReportNums = "A18R0S218210537,A18R0S218210543,A18R0S218210542,A18R0S218210536,A18R0S218210545,A18R0S218210544,A18R0S218210541,A18R0S218210540,A18R0S218210534,A18R0S218210535,A18R0S218210539,A18R0S218210547,A18R0S218210533,A18R0S218210546,A18R0S218210538";

	function start_floate(i) {
		var m = 0;
		var view_no;

		 if (i >= total_cnt2) {
			//document.getElementById('up_banner').href = "javascript:start_floate(" + (i - 1) + ");GoSNA('128000009', '','','stat', 'CHM1N009');";
			//document.getElementById('up_banner2').href = "javascript:start_floate(" + (i + 1) + ");GoSNA('128000010', '','','stat', 'CHM1N010');";

			document.getElementById('up_banner').href = "javascript:start_floate(" + (i - 1) + ");GoSNAChannel('CHM1N009','','stat');";
			document.getElementById('up_banner2').href = "javascript:start_floate(" + (i + 1) + ");GoSNAChannel('CHM1N010','','stat');";
		} else if (i == total_cnt2-1) {
			//document.getElementById('up_banner').href = "javascript:start_floate(" + (i - 1) + ");GoSNA('128000009', '','','stat', 'CHM1N009');";
			//document.getElementById('up_banner2').href = "javascript:start_floate(" + (0) + ");GoSNA('128000010', '','','stat', 'CHM1N010');";

			document.getElementById('up_banner').href = "javascript:start_floate(" + (i - 1) + ");GoSNAChannel('CHM1N009','','stat');";
			document.getElementById('up_banner2').href = "javascript:start_floate(" + (0) + ");GoSNAChannel('CHM1N010','','stat');";
		} else if (i <= 0) {
			//document.getElementById('up_banner').href = "javascript:start_floate(" + (total_cnt2 - 1) + ");GoSNA('128000009', '','','stat', 'CHM1N009');";
			//document.getElementById('up_banner2').href = "javascript:start_floate(" + (i + 1) + ");GoSNA('128000010', '','','stat', 'CHM1N010');";

			document.getElementById('up_banner').href = "javascript:start_floate(" + (total_cnt2 - 1) + ");GoSNAChannel('CHM1N009','','stat');";
			document.getElementById('up_banner2').href = "javascript:start_floate(" + (i + 1) + ");GoSNAChannel('CHM1N010','','stat');";
		} else {
			//document.getElementById('up_banner').href = "javascript:start_floate(" + (i - 1) + ");GoSNA('128000009', '','','stat', 'CHM1N009');";
			//document.getElementById('up_banner2').href = "javascript:start_floate(" + (i + 1) + ");GoSNA('128000010', '','','stat', 'CHM1N010');";

			document.getElementById('up_banner').href = "javascript:start_floate(" + (i - 1) + ");GoSNAChannel('CHM1N009','','stat');";
			document.getElementById('up_banner2').href = "javascript:start_floate(" + (i + 1) + ");GoSNAChannel('CHM1N010','','stat');";
		}

		for (m = 0; m <= view_cnt-1; m++) {
			if (i >= total_cnt2) {
				view_no = i - total_cnt2;
			} else {
				view_no = i;
			}
			document.getElementById('float_mov' + m).innerHTML = floatNewsEntity[view_no];
			floatNewsEntityAdLog[view_no];
			i = i + 1;
		}
	}
	function fnShowFavoriteGoods() {
		if (document.getElementById("PlusLayer")) {
			document.getElementById("PlusLayer").style.display = "none";
		}
		if ( memberWay  == 1 )
		{
			if(floatingImgflag == false) {
				showHint("/challenge/neo_include/floating/main_floating_select.asp?mtype=m3","total_mini_interest_layer");
				document.getElementById('total_mini_interest_layer').style.display = "";	
				document.getElementById('total_mini_interest_layer_close').style.display = ""; 
				floatingImgflag = true;
			}else{
				new_mini_Layer_hidden();
				showHint("/challenge/neo_include/floating/main_floating_select.asp?mtype=m3","total_mini_interest_layer");
				document.getElementById('total_mini_interest_layer').style.display = "";	
				document.getElementById('total_mini_interest_layer_close').style.display = "";	
			}
			document.getElementById('FminiDivView').style.display = "none";
		} else
		{
			if (confirm("ȸ�� �α��� �Ŀ� ��� �����մϴ�.")) 
				location.href="http://www.gmarket.co.kr/challenge/login.asp?url=http://www.gmarket.co.kr/";
		}
	}


<!--2015-08-19 18:35:11-->