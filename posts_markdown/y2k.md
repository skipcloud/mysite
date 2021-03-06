---
layout: post
title: "Y2K and the Year 2038 Problem"
date: "2020-02-22"
category: blog
tags: [y2k, 'year 2038 problem', binary]
---

Do you remember the Y2K problem? If you don't I'll bring you up to speed, back
in the 90s as we hurtled towards the year 2000 it became apparent that there
was going to be a problem. Computers would flip their shit when the clock ticked
over from December 31st 1999 to 1st January 2000. It was a whole thing, people
thinking the world would end and planes would fall out of the sky.

To understand why this was an issue we need to know a little about computers
back when they were in their infancy when memory was at a premium, the 50s and
60s to be precise. In 1965, for example, the PDP-7 computer[1] had a whopping
9KB of memory, which could be expanded to a eye watering 144KB.

As we got into the 70s memory had improved but not by much, this meant that when
programs were being written they had to be as economical as possible when it
came to memory. One way of doing that is to store and represent dates as two
digits 00-99, after all this won't be an issue in the future because computers
will improve and this code won't be running then, right? If you know anything
about programming you know there is a lot of code running in production that has
been there a _long_ time.  Banking is one sector that comes to mind.

### Y2K

The issue here is as you reach 99 then the year 2000 will be represented as 00,
but does that mean 2000 or 1900? A human can figure it out from context but
computers are quite stupid. Contrary to what the public think software engineers
were aware of this issue well ahead of time, people born in the 1850s were still
alive when computers were gaining steam in the 1950s. Pension systems ran into
issues when they were dealing with an individual who had apparently just born
been born a couple of years before.

Computers weren't just the issue here, people were putting lines in their code
like `if date > 85 then pay_pension`.  Just makes you wonder what code you have
written that isn't future proof. The reason Y2K wasn't an issue (or a big one
should I say, stuff still went wrong) was people knew well ahead of time that
this was coming and worked to fix it.  Some people think Y2K was some sort of
hoax, and those people are idiots.

There is a related problem I would like to talk about; have ever heard of the
Year 2038 problem? Before I get to what that is I need to tell you how computers
store and represent numbers in binary.

### Counting in binary

Computer architecture is based around how many bits a word contains. A "word" in
this context is a sequence of bits, for example a "word" in an 8 bit computer is
8 bits long `01001101`, its registers and CPU etc can work with words of 8 bits
in length.

Imagine we have a 4 bit computer, it is capable of only handling 4 bits at a
time - `0000`. There are a couple of ways you can represent an integer in a
computer, let `0000` represent zero then count up from there: `0001` (1),
`0010` (2), `0011` (3) etc. All the way up to `1111` which equals 15. This is
what is known as an "unsigned number", the name will make sense in just a
moment.

Now, if you want to represent a negative number you can't do it with this
technique, you could however sacrifice the highest bit (this one on the left
here -> `1000`) and use that as a sign to tell the computer whether the number
being stored is a positive or negative number. These are called "signed"
numbers.

### Signed integers

If the highest bit is a `1` then the computer would know the number is supposed
to be a negative number. One issue with signed numbers is you can no longer use
that bit to store the size of a number, so the biggest number you can represent
is a lot smaller. If you're able to represent 0 up to the number 15 with a 4 bit
unsigned integer, then you will only be able to represent -8 (`1000`) to 7
(`0111`) with a signed integer.

In this 4 bit example the biggest negative number we can represent is `1000`
(-8). If we start counting up like we normal would we get `1001` (-7), `1010`
(-6), all the way up to `1111` (-1). It is implemented this way so you can have
`0000` represent zero, and you can use Two's complement[2] to get the negative
of a number which is a lot easier for a computer to do than using One's
complement[3].

What happens happens when you have an unsigned number starting at `0000` and try
to increment to `1111` though? After you get all the way up to `0111` the next
binary number that follows is `1000`, which means the integer the binary
represents jumps from 7 to -8. This is what's known as integer overflow and is a
nasty wee bug. Fun fact: integer overflow was the original reason Gandhi was
such an asshole in the game Civilisation[4]

### Architecture

My examples before were based on a 4 bit computer but these days we typically
see 64 bit architecture in our computers, there are even 128 bit computers
kicking around but until 64 bit computers became the norm it was 32bit computers
that were all you could reasonably afford in the 1990s. In a 32 bit architecture
The biggest unsigned number you can represent is 4,294,967,295 and the biggest
signed integer you can represent is 2,147,483,647. Quite the difference.

### Year 2038

It took some build up but here we are: these days computers use the Unix
Epoch[5] to figure out the date, the epoch is the number of seconds that have
elapsed since January 1st 1970. To a computer nothing existed before this time.
Given that today 1,582,382,210 seconds have elapsed since the epoch a computer
can tell you it's Tues 28th of January 2020.  I guess you're smart enough to
know where this is going. By the time we reach 03:14:07 on Tuesday, 19 January
2038 any 32bit computer holding the seconds since Unix epoch in a signed
integer will overflow and the computer will think its 1901.

### What am I supposed to do with this information?

If you're smart you would start building that underground bunker and stocking up
on rations before the nuclear fallout rains from the sky. Or you can trust
software engineers will have ported all the important stuff over to 64 bit
architecture before anything nasty happens. If they do it gives us 292 billion
years to get sorted for the next overflow shit show.


[1] [https://en.wikipedia.org/wiki/PDP-7](https://en.wikipedia.org/wiki/PDP-7)

[2] [https://en.wikipedia.org/wiki/Two's_complement](https://en.wikipedia.org/wiki/Two's_complement)

[3] [https://en.wikipedia.org/wiki/Ones%27_complement](https://en.wikipedia.org/wiki/Ones%27_complement)

[4] [https://kotaku.com/why-gandhi-is-such-an-asshole-in-civilization-1653818245](https://kotaku.com/why-gandhi-is-such-an-asshole-in-civilization-1653818245)

[5] [https://en.wikipedia.org/wiki/Unix_time](https://en.wikipedia.org/wiki/Unix_time)
