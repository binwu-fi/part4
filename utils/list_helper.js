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
module.exports = {
  dummy,
  totalLikes
}