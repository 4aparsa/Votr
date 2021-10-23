from hashlib import sha256
import datetime
import json

from rest_framework.response import Response
from rest_framework.decorators import api_view

def update_hash(*args):
    hash_text = ''
    for arg in args:
        hash_text += str(arg)
    hash = sha256(hash_text.encode('utf-8'))
    return hash.hexdigest()

voter = {'name': 'genesis', 'ssn': '000000000', 'dob': '1400'}

class VoteBlock:
    def __init__(self, number = 0, previous_hash = '0' * 64, vote=None, voter=voter, nonce = 0):
        self.vote = vote
        self.number = number
        self.previous_hash = previous_hash
        self.nonce = nonce
        self.timestamp = str(datetime.datetime.now())
        self.voter = sha256((voter.get('name') + voter.get('ssn') + voter.get('dob')).encode('utf-8'))

    def hash(self):
        return update_hash(
            self.number,
            self.previous_hash,
            self.vote,
            self.nonce,
            self.voter
        )
    
    def encode(self):
        return self.__dict__

    def __str__(self):
        return f'VoteBlock#: {self.number}\nHash: {self.hash()}\nPrevious Hash: {self.previous_hash}\nVote: {self.vote}\nNonce: {self.nonce}'

class Blockchain:

    difficulty = 4

    def __init__(self, chain=[]):
        self.chain = chain

    def add(self, block):
        self.chain.append(block)
    
    def mine(self, block):
        block.previous_hash = self.chain[-1].hash()

        while True:
            if block.hash()[:self.difficulty] == '0' * self.difficulty:
                self.add(block)
                break
            else:
                block.nonce += 1

    def is_valid(self):
        for i in range(2, len(self.chain)):
            previous_hash = self.chain[i].previous_hash
            previous_block = self.chain[i - 1].hash()

            if previous_block != previous_hash or previous_block[:self.difficulty] != '0' * self.difficulty:
                return False
        return True
            


blockchain = Blockchain()

genesis = VoteBlock()
blockchain.add(genesis)

# votes = ['sanders', 'trump', 'biden']

# number = 0
# for vote in votes:
#     number += 1
#     blockchain.mine(VoteBlock(number = number, vote = vote))

@api_view(['GET'])
def get_blockchain(request):
    for block in blockchain.chain:
        print(block, end = '\n\n')
    blockchain_json = json.dumps(blockchain.chain, default=lambda o: o.encode())
    response = {
        'blockchain': blockchain_json,
        'length': len(blockchain.chain),
        'valid': blockchain.is_valid()
    }
    return Response(response)



@api_view(['POST'])
def add_vote(request):
    blockchain.mine(VoteBlock(number = blockchain.chain[-1].number + 1, vote = request.data.get('vote'), voter=request.data.get('voter')))
    vote_hash = blockchain.chain[-1].hash()
    # blockchain.chain[-1].vote = 'trump'
    for block in blockchain.chain:
        print(block, end = '\n\n')
    return Response({'message': 'Your vote had been recorded', 'vote_hash': vote_hash, 'valid': blockchain.is_valid()})


@api_view(['GET'])
def get_vote(request):
    for block in blockchain.chain:
        if block.hash() == request.data.get('vote_hash'):
            return Response({'message': f'You voted for {block.vote}', 'valid': blockchain.is_valid()})
    return Response({'message': 'Could not find your vote in the blockchain', 'valid': blockchain.is_valid()})