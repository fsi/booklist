/*
    booklist - a simple book list in js
    Copyright (C) 2014  FSi

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation; either version 2 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License along
    with this program; if not, write to the Free Software Foundation, Inc.,
    51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
*/

var app = angular.module('myBookApp', []);
app.controller('bookController', function($scope) {
    $scope.books = [{
        title: 'book a',
        author: 'asdf',
        complete: false,
        heart: false
    },{
        title: 'book b',
        author: 'sdf',
        complete: true,
        heart: false
    },{
        title: 'book c',
        author: 'dasfsdg',
        complete: false,
        heart: false
    }];
    $scope.completeBooks = [];
    $scope.incompleteBooks = [];
    
    var updateBooks = function() {
        $scope.completeBooks = [];
        $scope.incompleteBooks = [];
        $scope.books.map(function(b) {
            if(b.complete) 
                $scope.completeBooks.push(b);
            else
                $scope.incompleteBooks.push(b);
        });
        localStorage['books'] = JSON.stringify($scope.books);
    };
    $scope.addBook = function() {
        var book = {};
        if($scope.newBookTitle) {
            book.author = $scope.newBookAuthor;
            book.title = $scope.newBookTitle;
            book.complete = false;
            book.heart = false;
            $scope.books.push(book);
            $scope.newBookAuthor = '';
            $scope.newBookTitle = '';
        }
        updateBooks();
    };
    $scope.uncompleteBook = function(book) {
        $scope.books.map(function(b) {
            if((b.title == book.title) &&
                    (b.author == book.author)) {
                b.complete = false;
            }
        });
        updateBooks();
    }
    $scope.completeBook = function(book) {
        $scope.books.map(function(b) {
            if((b.title == book.title) &&
                    (b.author == book.author)) {
                b.complete = true;
            }
        });
        updateBooks();
    };
    $scope.heartBook = function(book) {
        book.heart = !book.heart;
        updateBooks();
    };
    $scope.removeBook = function(book) {
        $scope.books = $scope.books.filter(function(b) {
            return !((b.title == book.title) &&
                    (b.author == book.author));
        });
        updateBooks();
    };
    $scope.chooseRandomBook = function() {
        if($scope.incompleteBooks.length !== 0) {
            var id = Math.floor(Math.random() * ($scope.incompleteBooks.length));
            console.log(id);
            $scope.randomBook = (id + 1) + ". " + $scope.incompleteBooks[id].author + 
                " — " +
                $scope.incompleteBooks[id].title;
        }
        else {
            $scope.randomBook = "Add some books first!";
        }
    };

    $scope.books = [];
    if(localStorage.hasOwnProperty('books')) {
        $scope.books = JSON.parse(localStorage['books']);
    }
    updateBooks();
    
});