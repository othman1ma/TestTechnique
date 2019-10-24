({
	clickShow : function(component, event, helper) {
		var FormParent = component.find("FormParent");
        var FormNombreenfant = component.find("FormNombreenfant");
        $A.util.addClass(FormParent, "slds-hide");
    	$A.util.removeClass(FormParent, "slds-show");
        $A.util.removeClass(FormNombreenfant, "slds-hide");
    	$A.util.addClass(FormNombreenfant, "slds-show");
        var myAttria = component.find("Nom").get("v.value");
        console.log('Nom'+myAttria);
       
	},
    NombreEnfantSelectionner: function(component, event, helper) {
		//ajouter form enfant      
        var Nombreenfant = component.find("Nombreenfant").get("v.value");
        console.log('Contactform'+	Nombreenfant);
        for (var i = 0; i < Nombreenfant ; i++) {
        $A.createComponents([
            ["ui:inputText",
            {
               
                "label":'Nom',
                "aura:id":'Nom'+i,
                "name":'Nom'+i,
                "value" : ''
            }],
            ["ui:inputText",
            {
               
                "label":'Prenom',
                "aura:id":'Prenom'+i,
                "name":'Prenom'+i,
                "value" : ''
            }],
            ["ui:inputText",
            {
                "label":'Age',
                "aura:id":'Age'+i,
                "name":'Age'+i,
                "value" : ''
            }]
            ],
            function(newcmps,status,statusMessageList){
                console.log(newcmps);
                //Add the new button to the body array
                if (component.isValid()) {
                    console.log('cmp is valid');
                    var body = component.get("v.body");
                    body.push(newcmps[0]);
                    body.push(newcmps[1]);
                    body.push(newcmps[2]);
                    component.set("v.body", body);
                }
                

            }
        );
        }
        //afficher boutton suivant
        var clickshowlast = component.find("clickshowlast");
        $A.util.removeClass(clickshowlast, "slds-hide");
        $A.util.addClass(clickshowlast, "slds-show");
    	
        //********************
	},
    clickshowlast : function(component, event, helper) {
        var ContactEnfant = []
		var Nombreenfant = component.find("Nombreenfant").get("v.value");
        for (var i = 0; i < Nombreenfant ; i++) {
            var Nom = component.find("Nom"+i).get("v.value");
            var Prenom = component.find("Prenom"+i).get("v.value");
            var Age = component.find("Age"+i).get("v.value");
            var Contact = {FirstName: Nom, LastName: Prenom, Age__c: Age};
			ContactEnfant.push(Contact);
        }
       	console.log('ContactEnfant'+ContactEnfant);
        component.set("v.contList", ContactEnfant);
        component.set("v.nom", component.find("Nom").get("v.value"));
        component.set("v.prenom", component.find("Prenom").get("v.value"));
        component.set("v.titre", component.find("Titre").get("v.value"));
        component.set("v.email", component.find("Email").get("v.value"));
        var FormNombreenfant = component.find("FormNombreenfant");
        $A.util.addClass(FormNombreenfant, "slds-hide");
    	$A.util.removeClass(FormNombreenfant, "slds-show");
        var Recapitulaif = component.find("Recapitulaif");
        $A.util.addClass(Recapitulaif, "slds-show");
    	$A.util.removeClass(Recapitulaif, "slds-hide");
	} ,
    clickSave : function(component, event, helper) {
        var Nombreenfant = component.find("Nombreenfant").get("v.value");
        for (var i = 0; i < Nombreenfant ; i++) {
            var action = component.get("c.saveContact");
            	action.setParams({ 
                    'Nom' : component.find("Nom"+i).get("v.value"),
                    'Prenom' : component.find("Prenom"+i).get("v.value"),
                    'Age' : component.find("Age"+i).get("v.value")
                
            });
            
            $A.enqueueAction(action);
        }
        
      
	} 
})