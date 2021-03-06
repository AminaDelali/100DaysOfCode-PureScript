module Main where

import Prelude
import Effect (Effect)
import Effect.Console (log)
import Data.List
import Control.Plus (empty)
import Data.Maybe

type Address=
 { street :: String,
   city :: String,
   state :: String
 }



type Entry=
 { firstName :: String,
   lastName :: String,
   address :: Address
 }

type AddressBook = List Entry


showAddress :: Address -> String
showAddress address = address.street <> ", " <>
                      address.city <> ", " <>
                      address.state



showEntry :: Entry -> String
showEntry entry = entry.firstName <> ", " <>
                  entry.lastName <> ", " <>
                  showAddress entry.address


aBook :: AddressBook
aBook = empty

insertEntry :: Entry -> AddressBook -> AddressBook 
insertEntry = Cons



findEntry :: String -> String -> AddressBook -> Maybe Entry
findEntry  firstN lastN book = head $ filter filterEntry book
 where
   filterEntry :: Entry -> Boolean
   filterEntry entry = entry.firstName == firstN && entry.lastName == lastN


main :: Effect Unit
main = do
 log "Testing Records"
