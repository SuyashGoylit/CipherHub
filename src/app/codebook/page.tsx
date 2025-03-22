'use client';


export default function Codebook() {
  return (
    <div className="min-h-screen flex flex-col">
      
      <main className="p-8 flex-grow">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold mb-8 text-white">Classical Cipher Codebook</h1>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Caesar Cipher</h2>
            <p className="text-gray-300">
              The Caesar cipher is one of the simplest and most widely known encryption techniques. It is a substitution cipher where each letter in the plaintext is shifted a certain number of places down the alphabet.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>Key: A number (0-25) representing how many positions to shift each letter</li>
              <li>Example: With key 3, &apos;A&apos; becomes &apos;D&apos;, &apos;B&apos; becomes &apos;E&apos;, etc.</li>
              <li>Preserves case and non-alphabetic characters</li>
            </ul>
            <div className="mt-4 p-4 bg-gray-700 border border-gray-600 rounded-lg">
              <h3 className="font-semibold mb-2 text-white">Example:</h3>
              <pre className="text-sm font-mono text-gray-300">
{`Plaintext:  HELLO WORLD
Key:        3
Ciphertext: KHOOR ZRUOG

Shift table:
A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
D E F G H I J K L M N O P Q R S T U V W X Y Z A B C`}
              </pre>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Vigenère Cipher</h2>
            <p className="text-gray-300">
              The Vigenère cipher is a polyalphabetic substitution cipher that uses a keyword to shift each letter in the plaintext by varying amounts.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>Key: A word or phrase that determines the shift pattern</li>
              <li>Each letter in the key determines the shift amount for corresponding plaintext letters</li>
              <li>More secure than Caesar cipher due to varying shift amounts</li>
            </ul>
            <div className="mt-4 p-4 bg-gray-700 border border-gray-600 rounded-lg">
              <h3 className="font-semibold mb-2 text-white">Example:</h3>
              <pre className="text-sm font-mono text-gray-300">
{`Plaintext:  HELLO WORLD
Key:        KEY
Ciphertext: RIJVS UYVJN

Process:
H E L L O   W O R L D
K E Y K E   Y K E Y K
R I J V S   U Y V J N`}
              </pre>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Rail Fence Cipher</h2>
            <p className="text-gray-300">
              The Rail Fence cipher is a transposition cipher that writes text in a zigzag pattern across a number of &quot;rails&quot; and then reads off each rail to produce the ciphertext.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>Key: A number representing how many rails to use</li>
              <li>Text is written diagonally downwards and upwards</li>
              <li>Final text is read off horizontally rail by rail</li>
            </ul>
            <div className="mt-4 p-4 bg-gray-700 border border-gray-600 rounded-lg">
              <h3 className="font-semibold mb-2 text-white">Example with 3 rails:</h3>
              <pre className="text-sm font-mono text-gray-300">
{`Plaintext: HELLO WORLD

Writing pattern (3 rails):
H   O   L
 E L W R D
  L   O

Reading off rails:
HOL + ELWRD + LO = HOLELWRDLO`}
              </pre>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Block Transposition Cipher</h2>
            <p className="text-gray-300">
              The Block Transposition cipher arranges the plaintext into blocks of fixed size and reads off the columns to create the ciphertext.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>Key: A number determining the block size</li>
              <li>Text is arranged in rows of length equal to the key</li>
              <li>Ciphertext is created by reading down columns</li>
            </ul>
            <div className="mt-4 p-4 bg-gray-700 border border-gray-600 rounded-lg">
              <h3 className="font-semibold mb-2 text-white">Example with key=3:</h3>
              <pre className="text-sm font-mono text-gray-300">
{`Plaintext: HELLO WORLD

Block arrangement (3 columns):
H E L
L O W
O R L
D

Reading down columns:
HLO + EOR + LWL + D = HLOEORLWLD`}
              </pre>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Double Columnar Transposition Cipher</h2>
            <p className="text-gray-300">
              This cipher applies the columnar transposition process twice for increased security. It uses a keyword to determine the column order.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>Key: A word that determines column ordering</li>
              <li>Applies columnar transposition twice</li>
              <li>More secure than single transposition</li>
            </ul>
            <div className="mt-4 p-4 bg-gray-700 border border-gray-600 rounded-lg">
              <h3 className="font-semibold mb-2 text-white">Example with key=&quot;KEY&quot;:</h3>
              <pre className="text-sm font-mono text-gray-300">
{`Plaintext: HELLO WORLD
Key: KEY

First transposition:
K E Y
H E L
L O W
O R L
D

Reading columns in K-E-Y order:
HLO + EOR + LWL + D = HLOEORLWLD

Second transposition (with reversed key "YEK"):
Y E K
H L O
E O R
L W L
D

Final ciphertext:
ELD + OWL + RHO + L = ELDOWLRHOL`}
              </pre>
            </div>
          </section>
        </div>
      </main>

    </div>
  );
}

