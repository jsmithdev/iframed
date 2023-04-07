public without sharing class Iframed {

	public class Param {
		@AuraEnabled
		public String param { get; set; }
		@AuraEnabled
		public String sobjectApi { get; set; }
		@AuraEnabled
		public String field { get; set; }
		@AuraEnabled
		public String value { get; set; }
		@AuraEnabled
		public String recordId { get; set; }
	}
    
	@AuraEnabled
	public static String findParams (List<Iframed.Param> params) {

		System.debug('params: ' + params);
		try {
	
			for(Iframed.Param param : params) {
				String soql = 'SELECT ' + param.field + ' FROM ' + param.sobjectApi + ' WHERE Id = \'' + param.recordId + '\' LIMIT 1';
				Sobject rec = Database.query(soql);
				if(rec != null) {
					param.value = String.valueOf(rec.get(param.field));
				}
			}

			return JSON.serialize(params);
		} catch (Exception e) {
			throw new AuraHandledException(e.getMessage());
		}
	}
}