A repository for the Alexa Meetup held on 17-Aug-2019!

Why Databases - https://www.youtube.com/watch?v=TExwZxdLu2o
  
  
## **Create the database**

Step 1.

In order to save to the database, we must first configure our skill to connect to DynamoDB. To do this we can specify a specific table by calling **withTableName** and passing the name of the table we want to connect to.

  

    .withTableName('RockPaperScissor')



Step 2.

At this point, we're referencing a table that doesn't yet exist. We could, of course, navigate over to DynamoDB in the AWS console... but there's an easier way! The ASK SDK comes to our rescue in this case: **withAutoCreateTable**.

    .withAutoCreateTable(true)

Here's the whole thing in context:

    const skillBuilder = Alexa.SkillBuilders.standard();
    
    exports.handler = skillBuilder
      .addRequestHandlers(
           // ... handlers
      )
      .addErrorHandlers(ErrorHandler)
      .withTableName("RockPaperScissor")
      .withAutoCreateTable(true)
      .lambda();


### 

## **Read/Write from the database**

Reading from the database requires the use of  **attributesManager** and  **getPersistentAttributes**.

Writing to the database requires the use of  **attributesManager** and  **setPersistentAttributes**.

    async handle(handlerInput) {
     let persistentAttributes = await handlerInput.attributesManager
        .getPersistentAttributes() || {};
    
     persistentAttributes.launch = true;
     handlerInput.attributesManager.setPersistentAttributes(persistentAttributes);
     handlerInput.attributesManager.savePersistentAttributes();
    }
