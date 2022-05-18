var data = {
    start: 0,
    end: 10
}
// executes when DOM is loaded
$(function () {
    $('#searchString').on('keyup', suggest);
    $('#searchString').on('change', lookup);
    //$('#lookup').on('click', lookup);
    $('#content').on('click', 'a', bookmark);
    $('#bookmarks').on('click', bookmarks);
    $('#bookmarks').on('dblclick', clearBookmarks);
    $(window).on('scroll', function () {
        if ($(window).scrollTop() >= $(document).height() - $(window).height() - 60) {
            data.start += data.end + 1;
            lookup();
        }
    });
    lookup();
});

function suggest() {
    if ($('#searchString').val().length > 3) {
        $('#suggestions').children().remove();
        let data2 = {
            start: 0,
            end: 10,
            searchString: $('#searchString').val()
        }

        fetch(`/suggestions`, {
            method: 'POST',
            dataType: 'json',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data2)
        })
            .then(response => response.json())
            .then(words => {
                for (let w of words) {
                    $('#suggestions').append(`<option value='${w.word}'></option>`);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

function lookup() {
    $('#searchString').blur();
    if (!(this instanceof Window)) {
        data.start = 0;
        $('#content').children().remove();
        $('#suggestions').children().remove();
    }

    data.searchString = $('#searchString').val();
    fetch(`/lookup`, {
        method: 'POST',
        dataType: 'json',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(words => {
            console.log(words)
            for (let w of words) {
                $('#content').append(`<span class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
        <a wordID='${w.word}'><i class="bi bi-bookmark-fill"></i></a>
        <div class="d-flex gap-2 w-100 justify-content-between">
            <div>
                <h6 class="mb-0">${w.word}</h6>
                <p class="mb-0 opacity-75">${w.definition}</p>
            </div>
            <small class="opacity-50 text-nowrap">${w.wordtype}</small>
        </div>
        </span>`
                );
            }
        })
        .catch((error) => {

            console.log(error);
        });
}
function bookmark() {
    if (window.localStorage.dictionaryBookmarks) {
        let dbm = JSON.parse(window.localStorage.dictionaryBookmarks);
        dbm[dbm.length] = $(this).closest("span").prop('outerHTML');
        window.localStorage.dictionaryBookmarks = JSON.stringify(dbm);
    }
    else {
        window.localStorage.dictionaryBookmarks = JSON.stringify([$(this).closest('span').prop('outerHTML')]);
    }
}
function bookmarks() {
    if (window.localStorage.dictionaryBookmarks) {
    let bookmarks = JSON.parse(window.localStorage.dictionaryBookmarks);
    
        $('#content').children().remove();
        for (let b of bookmarks) {
            $('#content').append(b);
        }
    }
    else{
        alert('You have not bookmarked any word.');
    }
}
function clearBookmarks() {
    $('#content').children().remove();
    window.localStorage.clear();
    lookup();
}