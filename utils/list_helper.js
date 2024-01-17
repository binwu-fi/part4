//exercise 4.3 start
const dummy = (blogs) => {
  return 1
}

/*
//moved to the end
module.exports = {
  dummy
}
*/
//exercise 4.3 end

//exercise 4.4 start
const totalLikes = (blogs) => {
  //console.log(blogs[0].likes)
  var totalLikesAmount = blogs.reduce(function(sum, blogs) {
    return sum + blogs.likes
  }, 0)
  console.log(totalLikesAmount)
  return totalLikesAmount
}
//exercise 4.4 end

//exercise 4.5 start
const favoriteBlog = (blogs) => {
  const favoriteBlogBlog = blogs.reduce(
    (prev, current) => {
      return prev.likes > current.likes ? prev : current
    })
  console.log(favoriteBlogBlog)
  return favoriteBlogBlog
}
//exercise 4.5 end

//exercise 4.6 start
const mostBlogs = (blogs) => {
  //console.log(blogs[0])
  //Following code make collect author from blogs
  var authorList = blogs.map(function(x) {
    return x.author
  })
  //console.log(authorList)
  //Following code create dictionary of author and it's reapeat time from authorList
  const counts = {}
  authorList.forEach((el) => {
    counts[el] = counts[el] ? (counts[el] + 1) : 1
  })
  //console.log('Dictionary of author and its repeated time',(counts))
  // following code create new varible for save most repeated author and its amount
  var mostRepeatedAuthor = ''
  var mostRepeatedAuthor_amount = 0
  for(const [key, value] of Object.entries(counts)) {
    if (value > mostRepeatedAuthor_amount) {
      mostRepeatedAuthor = key
      mostRepeatedAuthor_amount = value
    }
    //console.log('author: ', key, '/', 'repeated amount: ', value)
  }
  //console.log ('most repeated author', mostRepeatedAuthor, '/', 'blogs amount', mostRepeatedAuthor_amount)
  const result = { 'author' : mostRepeatedAuthor, 'blogs' : mostRepeatedAuthor_amount }
  console.log(result)
  return result
}
//exercise 4.6 end

//exercise 4.7 start
const mostLikes = (blogs) => {
  //Following code make collect author from blogs
  var authorList = blogs.map(function(x) {
    return x.author
  })
  //console.log(authorList)
  //Following code remove duplicates of author list
  function removeDuplicates(authorList) {
    return authorList.filter((item,
      index) => authorList.indexOf(item) === index)
  }
  const uniqAuthorList = removeDuplicates(authorList)
  //console.log(uniqAuthorList)
  //console.log(authorList.length)
  //console.log(uniqAuthorList.length)
  //Following code create new dictionary using uniqAuthorList,the likes amount is 0 in the beginner
  var dicOfLikeAmount = {}
  function addZeroToDic (key) {
    dicOfLikeAmount[key] = 0
  }
  uniqAuthorList.forEach(addZeroToDic)
  //console.log(dicOfLikeAmount)
  //Following code go through blogs and add like amount to dicOfLikeAmount
  let i = 0
  for (i in blogs) {
    //console.log(blogs[i].author)
    dicOfLikeAmount[blogs[i].author] += blogs[i].likes
  }
  //console.log(dicOfLikeAmount)
  //Following code pick max likes and author of it and form result
  var mostLikesAuthor = ''
  var mostLikesAmount = 0
  for(const[key, value] of Object.entries(dicOfLikeAmount)) {
    if (value > mostLikesAmount) {
      mostLikesAuthor = key
      mostLikesAmount = value
    }
  }
  const result = { 'author' :  mostLikesAuthor, 'likes' : mostLikesAmount}
  console.log(result)

  return result
}
//exercise 4.7 end

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}