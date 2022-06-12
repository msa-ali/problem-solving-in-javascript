# Features

Let’s say you are a developer on the Facebook engineering team. Your team needs to improve the integration among the sister platforms. An important concern in this integration is achieving operational efficiency through not only efficient code, but also API rate limiters and elimination of similar requests by the same user on different platforms. Your team has also been requested to take this opportunity to implement features to detect potentially objectionable content.

Feature #1: Find all the people on Facebook that are in a user’s friend circle.

Feature #2: We want all the user’s friends on Facebook to be suggested on Instagram as well. Since Instagram is a different platform, all of its connections need to be copied to a separate database.

Feature #3: Sync the Facebook stories list with Instagram.

Feature #4: Limit the request rate from users. The same request cannot be sent from the other platform until a specified amount of time has elapsed since the request from the first platform.

Feature #5: Identify the morphed versions of abused and profane words so posts containing them can be flagged inappropriate.

Feature #6: Group the similar gibberish posts together so a decoding pattern can be observed.

Feature #7: Mining for patterns in posts by a user needs to be done on a high-performance cluster. You need to suggest an optimal assignment of posts to cluster nodes so that their processing power is optimally utilized.
