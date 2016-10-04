# To be done
[x] missing pages
[ ] localization
[ ] align error messages in validations from server and client
[ ] Submitting a form should only be possible if no errors in form
[ ] Replace <a ... /> with <Link ... />
[ ] Table => Sortable Table (https://github.com/glittershark/reactable/blob/master/README.md)
[ ] REST calls not resulting in valid JSON (i.e. 500) must be handled correctly (or make sure on server side that we ALWAYS get json). Anyway those errors must be shown to the user not only on the console.

# Refactoring / Clean up
[ ] Centralize fetch calls in own function and add error handling
[ ] maybe centralize location handling (push / redirect to other url) to remove need of context in components
[ ] OwnersPage => OwnerPage
[ ] align singular vs plural in HTTP api endpoints, client folder names and page names
[ ] centralize loading of an owner (EditOwnerPage, OwnersPage) and handle 404 from API
[ ] remove isNew from API (use id===null instead)
[ ] IBaseEntity: id as 'any'?
[ ] Refactor/Clean-up IPetRequest, IEditablePet (also on Server PetRequest) 

# New Features
[x] add client-side validation to input fields to show advantage of SPA 
[ ] introduce redux to cache entities on client? (on new branch?)
[ ] more 'in-place' editing instead of own pages (more SPA-ish feeling)
[ ] client-side testing

# Differences from original spring boot example
* Client-side validation


 