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

genesis_voter = {'name': 'genesis', 'ssn': '000000000', 'dob': '0'}

class VoteBlock:
    def __init__(self, number = 0, previous_hash = '0' * 64, vote=None, voter=genesis_voter, nonce = 0):
        self.vote = vote
        self.number = number
        self.previous_hash = previous_hash
        self.nonce = nonce
        self.timestamp = str(datetime.datetime.now())
        self.voter = sha256((voter.get('name') + voter.get('ssn') + voter.get('dob')).encode('utf-8')).hexdigest()

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
        return f'VoteBlock: {self.number}\nHash: {self.hash()}\nPrevious Hash: {self.previous_hash}\nVote: {self.vote}\nNonce: {self.nonce}'

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

@api_view(['GET'])
def get_blockchain(request):
    blockchain_view = json.dumps(blockchain.chain, default=lambda vote_block: vote_block.encode())

    response = {
        'blockchain': blockchain_view,
        'length': len(blockchain.chain),
        'blockchain_is_valid': blockchain.is_valid()
    }
    return Response(response)

@api_view(['POST'])
def add_vote(request):
    vote = request.data.get('vote')
    voter = request.data.get('voter')

    if RegisteredVoter.objects.filter(ssn=voter["ssn"], name=voter["name"], dob=voter["dob"]).exists():

        vote_block = VoteBlock(number = blockchain.chain[-1].number + 1, vote = vote, voter=voter)

        blockchain.mine(vote_block)
        vote_hash = blockchain.chain[-1].hash()

        return Response({'message': f'Your vote had been cast successfully. You voted for {vote}. Thank you for participating in democracy.', 'vote_hash': vote_hash, 'blockchain_is_valid': blockchain.is_valid()})

    else:
        return Response({'message': 'Your voting credentials have not been approved'})


@api_view(['GET'])
def get_vote(request):
    vote_hash = request.data.get('vote_hash')

    for block in blockchain.chain:
        if block.hash() == vote_hash:
            return Response({'message': f'Your vote is currently cast for {block.vote}.', 'blockchain_is_valid': blockchain.is_valid()})
    return Response({'message': 'Your vote cannot be found on the blockchain', 'blockchain_is_valid': blockchain.is_valid()})
