@isTest
public with sharing class IframedTest {

	@isTest
	public static void findParamsTestPass(){
		Account a = new Account(Name = 'Test Account');
		insert a;

		List<Iframed.Param> params = new List<Iframed.Param>();
		Iframed.Param param = new Iframed.Param();
		param.param = 'accId';
		param.sobjectApi = 'Account';
		param.value = '';
		param.field = 'Id';
		param.recordId = a.Id;
		params.add(param);

		Iframed.findParams(params);
	}

	@isTest
	public static void findParamsTestFail(){
		Account a = new Account(Name = 'Test Account');
		insert a;

		List<Iframed.Param> params = new List<Iframed.Param>();
		Iframed.Param param = new Iframed.Param();
		param.param = 'accId';
		param.sobjectApi = 'Account';
		param.value = '';
		param.field = 'Id';
		//param.recordId = a.Id;
		params.add(param);

		Iframed.findParams(params);
	}
}