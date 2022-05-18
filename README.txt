English Dictionary
1. Fetch and Promises are used to implment the functionality.
2. Only 10 words are loaded at a time, further words are loaded as the users scrolls down. This is done in order not to bock the UI because UI rendering is a synchronous function and too many DOM update will block the UI or in worst cases the page might crash.
3. As the string length passes 3 characters the app will present suggestion list.
4. Bookmarking feature is also implmented and it save the words to localStorage, 
    > click on the bookmark icon next to the word to bookmark it.
    > click Bookmarks button next to the search box to view all Bookmarks
    > Double click the Bookmarks button to remove all the bookmarks, once cleared first 10 words will be loaded in the app
5. Find the screenshots in Screenshot folder in root of the project.